const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const port = 5000;

// Secret Key for JWT (DO NOT use this in production, generate a strong key)
const JWT_SECRET = "my_super_secret_key_12345";

// Middleware
const allowedOrigins = ["http://localhost:5173", "http://localhost:5175"]; // Update with your frontend URLs

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/Blog', {
}).then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error("MongoDB connection error:", error));

// User Schema
const userSchema = new mongoose.Schema({
    fullName: String,
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: String
});

const User = mongoose.model('User', userSchema);

// Blog Post Schema
const postSchema = new mongoose.Schema({
    id: { type: String, default: () => require('uuid').v4() },
    username: String,
    AName: String,
    Title: String,
    Blog: String
});

const Post = mongoose.model('Post', postSchema);

// Register Route
app.post('/register', async (req, res) => {
    try {
        const { fullName, email, username, password } = req.body;

        if (!fullName || !email || !username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ fullName, email, username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid Username or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ username: username }, JWT_SECRET, { expiresIn: "1d" });

        // Store token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,  // Set true if using HTTPS in production
            sameSite: "lax",
            path: "/"
        });

        res.status(200).json({ message: "Login successful" });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Middleware for Protected Routes
const authenticate = (req, res, next) => {

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized, no token found" });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = decoded;
        next();
    });
};

app.get('/validate', authenticate, (req, res) => {
    res.json({ valid: true }); // Send explicit true if authenticated
});



// Logout Route
app.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false,  // Set to true in production (HTTPS)
        sameSite: "lax",
        path: "/"
    });
    res.json({ message: "Logged out successfully" });
});

// Get All Blog Posts
app.get('/api/posts', async (req, res) => {
    try {
        const token = req.cookies.token;
        let loggedInUser = null;

        // If user is logged in, decode the token
        if (token) {
            try {
                const decoded = jwt.verify(token, JWT_SECRET);
                loggedInUser = decoded.username; // Extract username from the token
            } catch (error) {
                console.error("JWT verification failed:", error);
            }
        }
        console.log(loggedInUser);
        
        const posts = await Post.find();

        // Update each post with an `isOwner` flag
        const updatedPosts = posts.map(post => ({
            ...post.toObject(),
            isOwner: loggedInUser ? post.username === loggedInUser : false
        }));

        res.json(updatedPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Create a New Blog Post (Protected Route)
app.post('/api/posts', authenticate, async (req, res) => {
    try {
        const userName = req.user.username;

        const { AName, Title, Blog } = req.body;
        const newPost = new Post({ username:userName, AName, Title, Blog });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a Blog Post (Protected Route)
app.put('/api/posts/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const result = await Post.updateOne({ id }, { $set: updatedData });

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json({ message: "Post updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// Delete a Blog Post (Protected Route)
app.delete('/api/posts/:id', authenticate, async (req, res) => {
    try {

        const { id } = req.params;

        const result = await Post.deleteOne({ id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// Debugging Route (Check Cookies)
app.get('/debug', (req, res) => {
    res.json({ cookies: req.cookies.token });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

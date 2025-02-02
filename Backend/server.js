// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const User = require('./model/user')

// Set up the express app
const app = express();
const port = 5000; // or any port you prefer

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse incoming requests with JSON payload

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/Blog').
  catch(error => handleError(error)).then(()=>{console.log("Connected");
  })

// Define the schema for a blog post
const postSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  AName: String,
  Title: String,
  Blog: String
});

// Create the model
const Post = mongoose.model('Post', postSchema);

// Route to get all blog posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post('/register' ,async (req,res)=>{
  // parse the data
  const {username,password} = await res.body();
  // Check both exist
  if(!(username && password)){
    res.status(400).send("Enter All fields")
  }  
  // 

})


// Route to delete Post
app.delete('/api/posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    console.log("Deleting post with slug:", slug);
    const result = await Post.deleteOne({id:slug});
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    console.log("Deleted successfully");
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Route to create a new blog post
app.post('/api/posts', async (req, res) => {
  const { AName, Title, Blog } = req.body;

  const newPost = new Post({
    AName,
    Title,
    Blog
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// Update Already Created Blog
app.put('/api/posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const updatedData = req.body; // Get new values from frontend

    console.log("Updating post with slug:", slug);

    const result = await Post.updateOne({ id: slug }, { $set: updatedData });

    if (result.matchedCount === 0) { 
      return res.status(404).json({ message: "Post not found" });
    }

    console.log("Updated successfully");
    res.json({ message: "Post updated successfully" });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

# 🚀 AI-Powered Blog Generator  

## 📌 About the Project  

This project is an AI-powered blog generation platform that allows users to:  
- ✅ **Generate** high-quality blog content using AI.  
- ✅ **Rewrite** existing blogs with AI assistance.  
- ✅ **Authenticate users** to manage posts.  
- ✅ **Store blogs** in a MongoDB database.  

Built with **React (Vite) + Node.js + MongoDB**, it provides a smooth and interactive experience.  

---

## 🌟 Features  

### 📝 Without Login (Guest User)  
- View blogs written by others.  
- Read featured articles.  

### 🔐 After Login (Authenticated User)  
- Generate AI-written blogs.  
- Rewrite existing blogs.  
- Submit and store blogs in the database.  
- Edit or delete their own blogs.  

---

## 🛠️ Tech Stack  

- **Frontend:** React (Vite), Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (MongoDB Compass for local DB management)  
- **Authentication:** JWT + bcrypt  
- **AI Integration:** Gemini AI  

---

## 🔧 Installation Guide  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### 2️⃣ Install Dependencies  
```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### 3️⃣ Set Up Environment Variables  
Create a `.env` file in the `server` directory and add:  

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Start the Development Server  
```bash
# Start frontend
cd client
npm run dev

# Start backend
cd ../server
node index.js
```

---

## 🔑 Authentication (JWT-Based)  
- Users can sign up, log in, and generate blogs.  
- JWT tokens are used for authentication.  
- Passwords are hashed using bcrypt for security.  
- Blogs are stored in MongoDB with user references.  

---

## 🤝 Contributing  

🙌 Contributions are welcome!  

1. Fork the repo  
2. Create a new branch:  
   ```bash
   git checkout -b feature-branch
   ```  
3. Commit your changes:  
   ```bash
   git commit -m "Add new feature"
   ```  
4. Push to the branch:  
   ```bash
   git push origin feature-branch
   ```  
5. Open a Pull Request  

---

## 📩 Contact  
📧 Your Name  
🔗 [LinkedIn Profile](https://www.linkedin.com/in/YOUR_USERNAME/)  

📌 Like this project? Give it a ⭐ on GitHub! 🚀  


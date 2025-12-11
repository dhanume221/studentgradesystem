# Deployment Guide

This guide describes how to deploy your Student Data application.
We will host the **Backend (Node.js/Express)** on **Render** (Free tier) and the **Frontend (React)** on **Vercel** (Free tier).

## Prerequisites

1.  **MongoDB Atlas Account**: You need a cloud MongoDB database.
    -   Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
    -   Create a free cluster.
    -   Get your connection string (e.g., `mongodb+srv://<username>:<password>@cluster0.mongodb.net/GradeHub?retryWrites=true&w=majority`).
    -   **Important**: Allow access from anywhere (0.0.0.0/0) in Network Access or whitelist Render's IP if possible (0.0.0.0/0 is easiest for free tier).

2.  **GitHub Repository**: Your code must be pushed to GitHub.

## Part 1: Deploy Backend to Render

1.  Sign up/Login to [Render](https://render.com).
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository.
4.  Select the repository `StudentData`.
5.  **Configure the service**:
    -   **Root Directory**: `backendserver` (Important! Your backend code is inside this folder).
    -   **Environment**: Node.
    -   **Build Command**: `npm install`.
    -   **Start Command**: `node server.js`.
6.  **Environment Variables** (Advanced):
    -   Add `MONGODB_URI`: Paste your MongoDB Atlas connection string.
    -   Add `PORT`: `5000` (Render might override this, but good to set).
7.  Click **Create Web Service**.
8.  Wait for the build to finish. Once live, copy the **Render URL** (e.g., `https://student-backend.onrender.com`).

## Part 2: Deploy Frontend to Vercel

1.  Sign up/Login to [Vercel](https://vercel.com).
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  **Configure the project**:
    -   **Framework Preset**: Vite.
    -   **Root Directory**: Click "Edit" and select `frontendclient/frontend`. (Important! Your frontend code is inside this folder).
5.  **Environment Variables**:
    -   Name: `VITE_API_URL`
    -   Value: Your Render Backend URL (e.g., `https://student-backend.onrender.com`). **Do not add a trailing slash**.
6.  Click **Deploy**.

## Part 3: Final Checks

1.  Open your Vercel App URL.
2.  Try adding a student.
3.  If it works, congratulations! You have deployed your MERN app.

### Troubleshooting
-   **CORS Error**: If you see CORS errors in the browser console, ensure your Backend `server.js` allows the Vercel domain. Currently `app.use(cors())` allows all domains, which is fine for testing but check if you restricted it.
-   **Database Error**: Check Render logs to see if MongoDB connected successfully.

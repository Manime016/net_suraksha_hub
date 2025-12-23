import dotenv from "dotenv";
dotenv.config(); // ✅ MUST BE FIRST — NO IMPORT ABOVE THIS

import express from "express";
import mongoose from "mongoose";
import app from "./app.js";   // or wherever your app is

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");
        app.listen(PORT, () =>
            console.log(`🚀 Server running on port ${PORT}`)
        );
    })
    .catch((err) => console.error(err));



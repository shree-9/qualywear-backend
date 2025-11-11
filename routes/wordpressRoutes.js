import express from "express";
import axios from "axios";

const router = express.Router();

// 📰 Fetch latest posts from your WordPress site
router.get("/posts", async (req, res) => {
  try {
    const { data } = await axios.get(`${process.env.WP_API_URL}/posts`);
    res.json(data);
  } catch (error) {
    console.error("❌ Error fetching WordPress posts:", error.message);
    res.status(500).json({ message: "Failed to fetch WordPress posts" });
  }
});

// 🧾 Fetch WordPress pages (About / Contact)
router.get("/pages", async (req, res) => {
  try {
    const { data } = await axios.get(`${process.env.WP_API_URL}/pages`);
    res.json(data);
  } catch (error) {
    console.error("❌ Error fetching WordPress pages:", error.message);
    res.status(500).json({ message: "Failed to fetch WordPress pages" });
  }
});

export default router;

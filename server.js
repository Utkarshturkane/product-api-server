// // server.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// // Proxy API route
// app.get('/api/products', async (req, res) => {
//   try {
//     const response = await fetch('https://fakestoreapi.com/products');
//     const data = await response.json();
//     res.json(data);
//   } catch (err) {
//     console.error("Fetch error:", err);
//     res.status(500).json({ error: 'Failed to fetch products' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });


app.get('/api/products', async (req, res) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products', {
      headers: {
        'User-Agent': 'Mozilla/5.0', // mimic browser
        'Accept': 'application/json'
      }
    });

    // Check if the response is actually JSON
    const contentType = response.headers.get("content-type");
    if (!response.ok || !contentType.includes("application/json")) {
      throw new Error("Unexpected response format");
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

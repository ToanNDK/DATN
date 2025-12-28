// src/server.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "";

// Kiểm tra biến môi trường
if (!MONGO_URI) {
  console.error("❌ Thiếu MONGO_URI trong file .env");
  process.exit(1);
}

// Kết nối MongoDB và khởi động server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Kết nối MongoDB thành công");
    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Lỗi kết nối MongoDB:", err);
    process.exit(1);
  });

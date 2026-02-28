// ================================
// IMPORTS
// ================================

// เรียกใช้งาน express
const express = require("express");

// เรียก pool จากไฟล์ db.js
const pool = require("./db");

// สร้าง express app
const app = express();

// เปิดให้รับ JSON จาก request body
app.use(express.json());


// ================================
// ROUTES
// ================================

// หน้าแรก ทดสอบว่า server ทำงานปกติ
app.get("/", (req, res) => {
  res.send("Rocker Steak API is running 🚀");
});


/*
  Route สำหรับทดสอบการเชื่อมต่อ Database
  ถ้าเชื่อมสำเร็จ จะส่งเวลาปัจจุบันจาก PostgreSQL กลับมา
*/
app.get("/test-db", async (req, res) => {
  try {
    // ยิง SQL ง่าย ๆ ไปที่ DB
    const result = await pool.query("SELECT NOW()");

    // ส่งผลลัพธ์กลับ
    res.json({
      message: "Database connected ✅",
      time: result.rows[0].now,
    });

  } catch (error) {
    // ถ้า error ให้แสดงใน console
    console.error("Database error:", error);

    res.status(500).json({
      message: "Database connection failed ❌",
    });
  }
});


// ================================
// SERVER START
// ================================

// ใช้ PORT จาก Railway (สำคัญมาก)
const PORT = process.env.PORT || 3000;

// สั่งให้ server เริ่มทำงาน
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
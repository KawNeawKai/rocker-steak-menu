// ดึง Pool class จาก package pg
// Pool คือระบบจัดการ connection กับ PostgreSQL
const { Pool } = require("pg");

// สร้าง instance ของ Pool
const pool = new Pool({
  // ใช้ค่า DATABASE_URL จาก Environment Variables (ที่ใส่ใน Railway)
  connectionString: process.env.DATABASE_URL,

  // Railway ต้องใช้ SSL
  ssl: {
    rejectUnauthorized: false,
  },
});

// export pool ออกไปให้ไฟล์อื่นเรียกใช้
module.exports = pool;
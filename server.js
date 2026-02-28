// นำเข้า pool จากไฟล์ db.js
const pool = require('./db')

/*
  Route สำหรับทดสอบการเชื่อมต่อ PostgreSQL
  ถ้าเชื่อมได้ จะตอบว่า Database connected
*/
app.get('/test-db', async (req, res) => {
  try {
    // ยิงคำสั่ง SQL ง่าย ๆ ไปทดสอบ
    const result = await pool.query('SELECT NOW()')

    // ถ้าสำเร็จ ส่งเวลาปัจจุบันกลับมา
    res.json({
      message: 'Database connected ✅',
      time: result.rows[0].now
    })

  } catch (error) {
    // ถ้าเชื่อมไม่ได้ แสดง error
    console.error(error)

    res.status(500).json({
      message: 'Database connection failed ❌'
    })
  }
})
const mysql = require('mysql2/promise');
const exp = require("express");
const app = exp();
require("dotenv").config()
var cors = require('cors');
app.use( [ cors() , exp.json() ] );

const connectDb = async () => {
    const db = await mysql.createConnection({
       host:'localhost', 
       user:'root', 
       password:process.env.MYSQL_PASSWORD, 
       port:3306, 
       database:'laptop_react'
    });
    
    db.connect( err => { 
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
            // throw err
        }; 
        console.log('Da ket noi database') 
    });
    return db
}


app.get('/spmoi/:sosp?', async function(req, res) {
    const db = await connectDb();
    let sosp = parseInt(req.params.sosp || 6);
    if (sosp <= 1) sosp = 6;
    let sql = 'SELECT id, ten_sp, gia, gia_km, hinh, ngay, luot_xem FROM san_pham WHERE an_hien = 1 ORDER BY ngay desc LIMIT 0, ?';
    const [result] = await db.query(sql, sosp);
    if (!result) return res.json({"thongbao": "Lỗi lấy list sp", err })
    console.log(result);
    return res.json(result);
});

app.get('/sp/:id', async function(req, res) {
    const db = await connectDb();
    let id = parseInt(req.params.id || 0);      
    if ( isNaN(id) || id <= 0) { 
      res.json({"thong bao":"Không biết sản phẩm", "id": id});  return; 
    }
    let sql = `SELECT * FROM san_pham WHERE id = ?`
    
    const [result] = await db.query( sql , id);
    if (!result) return res.json({"thongbao":"Lỗi lấy 1 sp", err })
    return res.json(result[0]);
});

app.get('/sphot', async function(req, res) {
    const db = await connectDb();
    let sql = `SELECT * FROM san_pham WHERE hot = 1`
    
    const [result] = await db.query(sql);
    if (!result) return res.json({"thongbao":"Lỗi lấy sp hot", err })
    return res.json(result);
});

app.get('/sptrongloai/:id_loai', async function (req, res) {
    const db = await connectDb();
    let id_loai = parseInt(req.params.id_loai );
    if (isNaN(id_loai) | id_loai<=0) {
        res.json({"thong bao": "Không biết loại", "id_loai": id_loai}); return;
    }
    let sql = `SELECT id, ten_sp, gia, gia_km, hinh, ngay FROM san_pham WHERE id_loai=? AND an_hien = 1 ORDER BY id desc`;
    
    const [result] = await db.query(sql, id_loai);
    if (!result) return  res.json({"thongbao": "Lỗi lấy sp trong loại", err })
    return res.json(result);
});

app.get('/loai/:id_loai', async function (req, res) {
    const db = await connectDb();
    let id_loai = parseInt(req.params.id_loai );
    if (isNaN(id_loai) | id_loai<=0) {
        res.json({"thong bao": "Không biết loại", "id_loai": id_loai}); return;
    }
    let sql = `SELECT id, ten_loai FROM loai WHERE id=?`;
    
    const [result] = await db.query(sql, id_loai);
    if (!result) return  res.json({"thongbao": "Lỗi lấy loại: ", err })
    return res.json(result);
});

// nơi định nghĩa các đường route

const port = process.env.PORT || 3999

app.listen(port, 
    () => console.log(`Ung dung dang chay voi port ${port}`)
);
import mysql from 'mysql2/promise';
import exp from "express";
import jwt from "jsonwebtoken";
import {config} from "dotenv";
import cors from 'cors';
import fs from 'fs';
import { checkUserPass, getUserInfo } from './utils/user.util';
const app = exp();
app.use( [ cors() , exp.json() ] );
config();

const PRIVATE_KEY = fs.readFileSync("private-key.txt");

export const connectDb = async () => {
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

/**
 * Put
 */
app.put('/admin/sp/:id', async function (req, res) {
    const db = await connectDb();

    let data = req.body;
    let id = req.params.id;
    let sql = 'UPDATE san_pham SET? WHERE id= ?';
    const result = await db.query(sql, [data, id]);
    if (!result) return  res.json({"thongbao": "Lỗi cập nhật sp", err })
    return res.json({"thongbao": "Đã cập nhật sp" });
});

app.put('/admin/loai/:id', async function (req, res) {
    const db = await connectDb();

    let data = req.body;
    let id = req.params.id;
    let sql = 'UPDATE loai SET? WHERE id= ?';
    const result = await db.query(sql, [data, id]);
    if (!result) return  res.json({"thongbao": "Lỗi cập nhật sp", err })
    return res.json({"thongbao": "Đã cập nhật sp" });
});
// http://localhost:3500/sp/${id}

/**
 * Post
 */
app.post("/login", async(req, res) => {
    console.log("body: ", req.body);
    const un = req.body.un;
    const pw = req.body.pw;
    const isUser = await checkUserPass(un, pw);
    if(isUser == true) {
        const userInfo = await getUserInfo(un, pw);
        const jwtBearToken = jwt.sign({}, PRIVATE_KEY, {
            algorithm: "RS256",
            expiresIn: 120,
            subject: userInfo.id
        })
        res.status(200).json({
            token: jwtBearToken,
            expiresIn: 120,
            subject: userInfo
        })
    } else res.status(401).json({thongbao: "Đăng nhập thất bại!"})
});

app.post('/luudonhang/', async function (req, res) {
    const db = await connectDb();

    let data = req.body;
    let sql= `INSERT INTO don_hang SET ? `;
    console.log("data: ", data);

    try {
        await db.query(sql, data);
        // id_dh = data.insertId;
        console.log("data: ", data);

        return res.json({"id_dh": 1, "thongbao": "Đã lưu đơn hàng"});
    } catch (error) {
        // throw new Error(error);
        return res.json({"id_dh":-1, "thongbao": "Lỗi lưu đơn hàng", error })
    }
});

app.post('/luugiohang/', async function (req, res) {
    const db = await connectDb();

    let data = req.body;
    let sql = `INSERT INTO don_hang_chi_tiet SET ? `;
    console.log("data: ", data);
    try {
        await db.query(sql, data);
        res.json({"thongbao": "Đã lưu sp vào db", "id_sp": data.id_sp})
    } catch (error) {
        return res.json({"thongbao": "Lỗi lưu sp", error })
    }
})

// insert product
app.post('/admin/sp', async function(req, res) {
    const db = await connectDb();

    let data = req.body;
    let sql = 'INSERT INTO san_pham SET ?';
    try {
        await db.query(sql, data);
        return res.json({"thongbao": "Đã chèn 1 sp" }); 
    } catch (error) {
        return res.json({"thongbao": "Lỗi chèn 1 sp", error })
    }
});

// insert loai
app.post('/admin/loai', async function(req, res) {
    const db = await connectDb();

    let data = req.body;
    let sql = 'INSERT INTO loai SET ?';
    try {
        await db.query(sql, data);
        return res.json({"thongbao": "Đã chèn 1 loai" }); 
    } catch (error) {
        return res.json({"thongbao": "Lỗi chèn 1 loai", error })
    }
});

/**
 * Get
 */
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
    let sql = `SELECT * FROM san_pham WHERE hot = 1 limit 9 offset 0`
    
    const [result] = await db.query(sql);
    console.log(result);
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

app.get('/admin/loai/:id_loai', async function (req, res) {
    const db = await connectDb();
    let id_loai = parseInt(req.params.id_loai );
    if (isNaN(id_loai) | id_loai<=0) {
        res.json({"thong bao": "Không biết loại", "id_loai": id_loai}); return;
    }
    let sql = `SELECT * FROM loai WHERE id=?`;
    
    const [result] = await db.query(sql, id_loai);
    if (!result) return  res.json({"thongbao": "Lỗi lấy loại: ", err })
    return res.json(result);
});

app.get('/admin/loai', async function (req, res) {
    const db = await connectDb();
    const {
        limit, 
        offset
    } = req.query;
    let sql = `SELECT * FROM loai ORDER BY created_at desc limit ${limit} offset ${offset}` ;

    const [result] = await db.query(sql);
    if (!result) return  res.json({"thongbao": "Lỗi lấy list sp", err })
    return res.json(result);
});

app.get('/admin/sp', async function (req, res) {
    const db = await connectDb();
    const {
        limit, 
        offset
    } = req.query;
    let sql = `SELECT * FROM san_pham ORDER BY ngay desc limit ${limit} offset ${offset}` ;

    const [result] = await db.query(sql);
    if (!result) return  res.json({"thongbao": "Lỗi lấy list sp", err })
    return res.json(result);
});

app.get('/admin/users', async function (req, res) {
    const db = await connectDb();
    const {
        limit, 
        offset
    } = req.query;
    let sql = `SELECT * FROM users ORDER BY created_at desc limit ${limit} offset ${offset}` ;

    const [result] = await db.query(sql);
    if (!result) return  res.json({"thongbao": "Lỗi lấy list user", err })
    return res.json(result);
});

app.get('/admin/sp/:id', async function (req, res) {
    const db = await connectDb();

    let id = parseInt(req.params.id);
    if (id <= 0) {
        res.json({"thong bao": "Không biết sản phẩm", "id": id}); return;
    }

    let sql =  'SELECT * FROM san_pham WHERE id = ?';
    const [result] = await db.query(sql, id);
    if (!result) return  res.json({"thongbao": "Lỗi lấy 1 sp", err })
    return res.json(result[0]);
});


/**
 * Delete
 */
app.delete('/admin/sp/:id', async function(req, res) {
    const db = await connectDb();

    let id =  req.params.id;
    let sql = 'DELETE FROM san_pham WHERE id = ?';
    try {
        await db.query(sql, id);
        return res.json({"thongbao": "Đã xóa sp" });
    } catch (error) {
        return res.json({"thongbao": "Lỗi khi xóa sp", error })
    }
});

app.delete('/admin/loai/:id', async function(req, res) {
    const db = await connectDb();

    let id =  req.params.id;
    let sql = 'DELETE FROM loai WHERE id = ?';
    try {
        await db.query(sql, id);
        return res.json({"thongbao": "Đã xóa loai" });
    } catch (error) {
        return res.json({"thongbao": "Lỗi khi xóa loai", error })
    }
});

// nơi định nghĩa các đường route

const port = process.env.PORT || 3999

app.listen(port, 
    () => console.log(`Ung dung dang chay voi port ${port}`)
);
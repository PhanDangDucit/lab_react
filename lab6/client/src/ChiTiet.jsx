import { useParams } from "react-router-dom";
// import {listsp} from './data.js';
import { SanPhamLienQuan } from "./SanPhamLienQuan.jsx";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { themSP } from "./cartSlice.js";

export function ChiTiet() {
    let { id } = useParams();
    const api = `http://localhost:3500/sp/${id}`;
    // let sp = listsp[id];
    const [sp, ganSP] = useState([]);
    console.log("sp:", sp)
    const dispatch = useDispatch();


    useEffect(() => {
        fetch(api)
            .then(res => res.json())
            .then(data => ganSP(data))
    }, [id])

    return (
        <div id='chitiet'>        
           <h1 className="fs-4 text-black p-2">Sản phẩm chi tiết</h1>
            <div id="row1">
                <div id="trai"> 
                    <img src= {sp['hinh']} alt={sp['ten_sp']} /> 
                </div>
                <div id="phai"> 
                    <h1 className="h3"> {sp['ten_sp']} </h1>
                    <p><span>Giá gốc</span>: {Number(sp['gia']).toLocaleString("vi")} VNĐ</p>
                    <p><span>Giá KM</span>: {Number(sp['gia_km']).toLocaleString("vi")} VNĐ</p>
                    <p><span>Ngày</span>: {new Date(sp['ngay']).toLocaleString("vi-VN", {
                        dateStyle: "medium"
                    })}</p>
                    {sp['RAM'] && <p><span>RAM</span>: {sp['RAM']} </p>}
                    {sp['CPU'] && <p><span>CPU</span>: {sp['CPU']} </p>}
                    {sp['Dia'] && <p><span>Đĩa</span>: {sp['Dia']} </p>}
                    {sp['Mausac'] && <p><span>Màu sắc</span>: {sp['Mausac']} </p>}
                    <p>
                        <a href="#" onClick={() => dispatch(themSP(sp))}>Thêm vào giỏ</a>
                    </p>
                </div>
            </div>
            {sp['id_loai'] && <SanPhamLienQuan id_loai = {sp['id_loai']}/>}
            {/* <div id="row2"> SP Liên quan  </div> */}
        </div>
    )
}
import { useParams } from "react-router-dom";
import {listsp} from './data.js';
import { SanPhamLienQuan } from "./SanPhamLienQuan.jsx";

export function ChiTiet() {
    let { id } = useParams();
    let sp = listsp[id];

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
                    <p><span>Ngày</span>: {new Date(sp['ngay']).toLocaleString("vi-VN")}</p>
                    <p><span>RAM</span>: {sp['RAM']} </p>
                    <p><span>CPU</span>: {sp['CPU']} </p>
                    <p><span>Đĩa</span>: {sp['Dia']} </p>
                    <p><span>Màu sắc</span>: {sp['Mausac']} </p>
                </div>
            </div>
            <SanPhamLienQuan id_loai = {sp['id_loai']}/>
            {/* <div id="row2"> SP Liên quan  </div> */}
        </div>
    )
}
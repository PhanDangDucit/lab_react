import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "./Pagination";
import { useNavigate } from 'react-router'
import SPNoiBat from "./SPNoiBat";
import { nanoid } from "@reduxjs/toolkit";

function SanPhamList() {
    const [listSP, ganListSP] = useState([]);
    const navigate =  useNavigate();
    const [limit] = useState(5);
    const [offset, setOffset] = useState(0);
    const [dsloai, setDsLoai] = useState([]);


    useEffect(() => {
        const url = "http://localhost:3500/admin/loai?limit=20&offset=0";
        fetch(url)
            .then(res => res.json() )
            .then(data => {
                setDsLoai(data);
            })
        fetch(`http://localhost:3500/admin/sp?limit=${limit}&offset=${offset}`)
            .then(res => res.json())
            .then(data => {
                ganListSP(data)
            })
    }, [offset]);

    const xoaSP = (id) => {
        // if (window.confirm('Xóa thật không bồ')===false) return false;
        fetch(`http://localhost:3500/admin/sp/${id}`, {
            method: "delete"
        })
            .then(res => res.json())
            .then(() => {
                const newList = listSP.filter(sp => sp.id !== id);
                ganListSP(newList);
            });
    };
    function isMatch(sp) {
        if(listSP.length > 0 && dsloai.length > 0) {
            const loaiMatch = dsloai.find(loai => loai.id == sp.id_loai);
            return loaiMatch.ten_loai;
        }
        return ""
    }
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Tên SP</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Ngày</th>
                        <th scope="col">Loại</th>
                        <th scope="col">Ẩn hiện</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {listSP.map( (sp) => (
                        <tr key={nanoid()}>
                            <th>{sp.id}</th>
                            <td>
                                <div className="">
                                    <img src={sp["hinh"]} className="rounded" width={100}/>
                                </div>
                            </td>
                            <td>{sp.ten_sp}</td>
                            <td>{sp.gia.toLocaleString("vi")} VNĐ</td>
                            <td>{new Date(sp.ngay).toLocaleDateString('vi')}</td>
                            <td>{isMatch(sp)}</td>
                            <td>{sp.an_hien == 1 ?  "Hiện" : "Ẩn"}</td>
                            <td className="d-flex">
                                <button type="button" className='btn btn-danger' onClick={()=>xoaSP(sp.id)} >Xóa</button>
                                <Link to={"/admin/spsua/"+sp.id} className='btn btn-primary' >Sửa</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination 
                offset={offset} 
                setOffset={setOffset}
                limit={limit}
            />
            <SPNoiBat />
        </>
    );
}//SanPhamList
export default SanPhamList;
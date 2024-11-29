import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "./Pagination";
import { useNavigate } from 'react-router'
import SPNoiBat from "./SPNoiBat";

export function DanhSachLoai() {
    const [listLoai, ganListLoai] = useState([]);
    const navigate =  useNavigate();
    const [limit] = useState(5);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:3500/admin/loai?limit=${limit}&offset=${offset}`)
            .then(res => res.json())
            .then(data => ganListLoai(data));
        
       
    }, [offset]);

    const xoaSP = (id) => {
        if (window.confirm('Xóa thật không bồ')===false) return false;
        fetch(`http://localhost:3500/admin/loai/${id}`, {
            method: "delete"
        })
            .then(res => res.json())
            .then(() => {
                const newList = listLoai.filter(loai => loai.id !== id);
                ganListLoai(newList);
                navigate(0)
            });
    };
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên loại</th>
                        <th scope="col">Thứ tự</th>
                        <th scope="col">Ẩn hiện</th>
                        <th scope="col">Ngày tạo</th>
                        <th scope="col">Ngày sửa</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                        <tbody>
                            {listLoai.map( (loai, index) => (
                                <tr key={index}>
                                    <th scope="row">{loai.id}</th>
                                    <td>{loai.ten_loai}</td>
                                    <td>{loai.thu_tu}</td>
                                    <td>{loai.an_hien}</td>
                                    <td>{new Date(loai.created_at).toLocaleDateString('vi')}</td>
                                    <td>{new Date(loai.updated_at).toLocaleDateString('vi')}</td>
                                    <td className="d-flex">
                                        <button type="button" className='btn btn-danger' onClick={()=>xoaSP(loai.id)} >Xóa</button>
                                        <Link to={"/admin/loaisua/" + loai.id} className='btn btn-primary' >Sửa</Link>
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
}

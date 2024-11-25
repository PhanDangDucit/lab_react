import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "./Pagination";
import { useNavigate } from 'react-router'
function SanPhamList() {
    const [listSP, ganListSP] = useState([]);
    const navigate =  useNavigate();
    const [limit] = useState(5);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:3500/admin/sp?limit=${limit}&offset=${offset}`)
            .then(res => res.json())
            .then(data => ganListSP(data))
    }, [offset]);

    const xoaSP = (id) => {
        if (window.confirm('Xóa thật không bồ')===false) return false;
        fetch(`http://localhost:3500/admin/sp/${id}`, {
            method: "delete"
        })
            .then(res => res.json())
            .then(() => {
                const newList = listSP.filter(sp => sp.id !== id);
                ganListSP(newList);
                navigate(0)
            });
    };
    return (
        <>
            <div id="adminspList">
                <h5 className='sp' key={0}>
                    <b>Tên SP</b> 
                    <b>Ngày</b> 
                    <b>Giá</b> 
                    <b>
                        <a href="/admin/spthem">Thêm</a>
                    </b>
                </h5>
                {listSP.map( (sp, index) => (
                    <div className='sp' key={index}>
                        <span>{sp.ten_sp}</span> 
                        <span>{new Date(sp.ngay).toLocaleDateString('vi')}</span> 
                        <span>{sp.gia.toLocaleString("vi")} VNĐ</span>
                        <span>
                            <button type="button" className='btn btn-danger' onClick={()=>xoaSP(sp.id)} >Xóa</button>
                            <Link to={"/admin/spsua/"+sp.id} className='btn btn-primary' >Sửa</Link>
                        </span>
                    </div>
                ))}
            </div>
            <Pagination 
                offset={offset} 
                setOffset={setOffset}
                limit={limit}
            />
        </>
    );
}//SanPhamList
export default SanPhamList;
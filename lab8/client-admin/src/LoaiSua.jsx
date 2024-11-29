import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function LoaiSua() {
    let { id } = useParams();
    const [loai, ganLoai] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const api = `http://localhost:3500/admin/loai/${id}`;
        fetch(api)
            .then(res => res.json())
            .then(([data]) => ganLoai(data))
    }, [])
    console.log("loai:", JSON.stringify(loai))
    const submitDuLieu = () => {
        let url = `http://localhost:3500/admin/loai/${id}`;
        let opt = {
            method: "put",
            body: JSON.stringify({
                ...loai,
                updated_at: formatDate(new Date()),
            }),
            headers: { 'Content-Type': 'application/json' }
        };

        console.log("opt: " + JSON.stringify(opt));
    
        fetch(url, opt)
            .then(res => res.json() )
            .then(data => {
                navigate("/admin/loai")
            })
    }//submitDuLieu
    function formatDate(date) {
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    return (
        <form id="frmaddsp">
        <h2>Thêm sản phẩm</h2>
        <div className="row mb-3">
            <div className='col'>Tên Loại
                <input 
                    type="text"
                    className="form-control"
                    value={loai.ten_loai ?? ""}
                    onChange={ 
                        e => ganLoai({
                            ...loai, 
                            ten_loai: e.target.value
                        })
                    }
                />
            </div>
            <div className='col'>Ẩn hiện
                <input 
                    type="text"
                    className="form-control"
                    value={loai.an_hien ?? ""}
                    onChange={ 
                        e => ganLoai({
                            ...loai, 
                            an_hien: e.target.value
                        })
                    }
                />
            </div>
        </div>
        <div className="row mb-3">
            <div className='col'>Thứ tự
                <input 
                    type="number" 
                    className="form-control" 
                    value={loai.thu_tu ?? ""}
                    onChange={ 
                        e => ganLoai({
                            ...loai, 
                            thu_tu: e.target.value
                        })
                    } 
                />
            </div>
        </div>
        <div className='mb-3'>
            <button 
                className="btn btn-warning" 
                type="button" 
                onClick={ () => submitDuLieu()} 
            > 
                Sửa loại
            </button> &nbsp;
            <Link to="/admin/loai" className='btn btn-info'>Danh sách loại</Link>
        </div>
    </form>
    )
}
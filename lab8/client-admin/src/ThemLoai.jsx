import { useState } from "react";
import { Link } from "react-router-dom";
/**
 * loai: id, ten_loai, slug, thu_tu, an_hien, created_at, updated_at
 */
export function ThemLoaiSP() {
    const [loai, setLoai] = useState({});
    // let sp = {};
    console.log("sp:", JSON.stringify(loai))
    const submitDuLieu = () => {
        let url = "http://localhost:3500/admin/loai";
        let opt = {
            method: "post",
            // id, ten_loai, slug, thu_tu, an_hien, created_at, updated_at
            body: JSON.stringify({
                ...loai
            }),
            headers: { 'Content-Type': 'application/json' }
        };

        console.log("opt: " + JSON.stringify(opt));
    
        fetch(url, opt)
            .then(res => res.json() )
            .then(data => {
                console.log('Đã thêm');
                setLoai({});
            })
    }//submitDuLieu

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
                            e => setLoai({
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
                            e => setLoai({
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
                            e => setLoai({
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
                    Thêm loại
                </button> &nbsp;
                <Link to="/admin/loai" className='btn btn-info'>Danh sách</Link>
            </div>
        </form>
    )
}
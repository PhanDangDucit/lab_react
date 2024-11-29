import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function SanPhamSua() {
    let { id } = useParams();
    const [sp, ganSP] = useState({});
    const navigate = useNavigate();
    const [dsloai, setDsLoai] = useState([]);
    useEffect(() => {
        const url = "http://localhost:3500/admin/loai?limit=20&offset=0";
        fetch(url)
            .then(res => res.json() )
            .then(data => {
                setDsLoai(data);
            })
    }, [])
    useEffect(() => {
        const api = `http://localhost:3500/admin/sp/${id}`;
        fetch(api)
            .then(res => res.json())
            .then(data => ganSP(data))
    }, [])
    // let sp = {};
    console.log("sp:", JSON.stringify(sp))
    const submitDuLieu = () => {
        let url = `http://localhost:3500/admin/sp/${id}`;
        let opt = {
            method: "put",
            body: JSON.stringify({
                ...sp,
                ngay: formatDate(sp.ngay),
                
            }),
            headers: { 'Content-Type': 'application/json' }
        };

        console.log("opt: " + JSON.stringify(opt));
    
        fetch(url, opt)
            .then(res => res.json() )
            .then(data => {
                console.log('Đã sửa');
                ganSP({});
                navigate("/admin/sp")
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

    function isMatch(sp) {
        if(dsloai.length > 0 && sp.id_loai) {
            const loaiMatch = dsloai.find(loai => loai.id == sp.id_loai);
            console.log("=========");
            console.log("sp::", sp);
            console.log("loaiMatch: ", loaiMatch)
            if(loaiMatch) {
                return loaiMatch.ten_loai;
            }
            return ""
        }
        return ""
    }
    

    console.log("sp.ngay: ", sp.ngay)
    return (
            <form id="frmaddsp">
                <h2>Sửa sản phẩm</h2>
                <div className="row mb-3">
                    <div className='col'>Tên SP
                        <input 
                            type="text"
                            className="form-control"
                            value={sp.ten_sp ?? ""}
                            onChange={ 
                                e => ganSP({
                                    ...sp, 
                                    ten_sp: e.target.value
                                })
                            }
                        />
                    </div>
                    <div className='col'>Giá 
                        <input 
                            type="number" 
                            className="form-control" 
                            value={sp.gia ?? 0}
                            onChange={
                                e => ganSP({
                                    ...sp, 
                                    gia: e.target.value
                                })
                            } 
                        />
                    </div>
                    <div className='col'>Giá KM 
                        {/* <input type="number" className="form-control"/> */}
                        <input 
                            type="number" 
                            className="form-control" 
                            value={sp.gia_km ?? ""}
                            onChange={ 
                                e => ganSP({
                                    ...sp, 
                                    gia_km: e.target.value
                                })
                            }
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className='col'>Hình 
                        <input type="text" className="form-control" onChange={ e => sp.hinh = e.target.value}/>
                    </div>
                    <div className='col'>Ngày
                        <input 
                            type="date" 
                            className="form-control" 
                            value={ formatDate(sp.ngay) ?? ""}
                            onChange={
                                e => ganSP({
                                    ...sp, 
                                    ngay: e.target.value
                                })
                            }
                        />
                    </div>
                    <div className='col'>Lượt xem 
                        <input 
                            type="number" 
                            className="form-control" 
                            value={sp.luot_xem ?? ""}
                            onChange={ 
                                e => ganSP({
                                    ...sp, 
                                    luot_xem: e.target.value
                                })
                            } 
                        />
                    </div>
                </div>
                <select
                    className="form-select mb-3" 
                    aria-label="Default select example"
                    onChange={(e) => ganSP({
                        ...sp,
                        id_loai: e.target.value
                    })}
                    // defaultValue={sp.id_loai}
                >
                        <option selected={sp.id_loai}>{isMatch(sp)}</option>
                    {
                        dsloai.map(
                            loai => (
                                <option value={loai.id} key={loai.id}>{loai.ten_loai}</option>
                            )
                        )
                    }
                </select>
                <div className='mb-3'>
                    <button 
                        className="btn btn-warning" 
                        type="button" 
                        onClick={ () => submitDuLieu()} 
                    > 
                        Sửa sản phẩm
                    </button> &nbsp;
                    <a href="/admin/sp" className='btn btn-info'>Danh sách sản phẩm</a>
                </div>
            </form>
    )
}
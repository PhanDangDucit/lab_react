import { useEffect, useState } from "react";
import { FormUploadImage } from "./components/form-upload-image";
import { Link } from "react-router-dom";

export default function SanPhamThem() {
    const [sp, setSp] = useState({});
    const [dsloai, setDsLoai] = useState([]);
    useEffect(() => {
        const url = "http://localhost:3500/admin/loai?limit=20&offset=0";
        fetch(url)
            .then(res => res.json() )
            .then(data => {
                setDsLoai(data);
            })
    }, [])
    // let sp = {};
    console.log("sp:", JSON.stringify(sp))
    const submitDuLieu = () => {
        let url = "http://localhost:3500/admin/sp";
        let opt = {
            method: "post",
            body: JSON.stringify({
                ...sp, 
                id_loai: 1, 
                tinh_chat:1
            }),
            headers: { 'Content-Type': 'application/json' }
        };

        console.log("opt: " + JSON.stringify(opt));
    
        fetch(url, opt)
            .then(res => res.json() )
            .then(data => {
                console.log('Đã thêm');
                setSp({});
            })
    }//submitDuLieu

    return (
            <form id="frmaddsp">
                <h2>Thêm sản phẩm</h2>
                <div className="row mb-3">
                    <div className='col'>Tên SP
                        <input 
                            type="text"
                            className="form-control"
                            value={sp.ten_sp ?? ""}
                            onChange={ 
                                e => setSp({
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
                                e => setSp({
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
                                e => setSp({
                                    ...sp, 
                                    gia_km: e.target.value
                                })
                            }
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className='col'>Hình 
                            <FormUploadImage sp={sp} setSp={setSp}/>
                        {/* <input type="text" className="form-control" onChange={ e => sp.hinh = e.target.value}/> */}
                    </div>
                    <div className='col'>Ngày
                        <input 
                            type="date" 
                            className="form-control" 
                            value={sp.ngay ?? ""}
                            onChange={
                                e => setSp({
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
                                e => setSp({
                                    ...sp, 
                                    luot_xem: e.target.value
                                })
                            } 
                        />
                    </div>
                </div>
                <select
                    className="form-select mb-3 w-25" 
                    aria-label="Default select example"
                    onChange={(e) => setSp({
                        ...sp,
                        id_loai: e.target.value
                    })}
                >
                        <option selected>Open this select menu</option>
                    {
                        dsloai.map(
                            loai => (
                                <option value={loai.id} key={loai.id}>{loai.ten_loai}</option>
                            )
                        )
                    }
                </select>
                <div className="d-flex my-3">
                    <div>
                        <input type="radio" name="hide_show" 
                            onChange={() => setSp({
                                ...sp, 
                                an_hien: 0
                            })}
                            checked={sp.an_hien === 0}
                            /> Ẩn
                    </div>
                    
                    <div className="mx-5">
                        <input type="radio" name="hide_show"
                            onChange={() => setSp({
                                ...sp, 
                                an_hien: 1
                            })}
                            checked={sp.an_hien === 1}
                        /> Hiện
                    </div>
                </div>

                <div className='mb-3'>
                    <button 
                        className="btn btn-warning" 
                        type="button" 
                        onClick={ () => submitDuLieu()} 
                    > 
                        Thêm sản phẩm
                    </button> &nbsp;
                    <Link to="/admin/sp" className='btn btn-info'>Danh sách</Link>
                </div>
               
            </form>
    )
}
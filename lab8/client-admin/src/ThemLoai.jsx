import { useState } from "react";
/**
 * loai: id, ten_loai, slug, thu_tu, an_hien, created_at, updated_at
 */
export function ThemLoaiSP() {
    const [sp, setSp] = useState({});
    // let sp = {};
    console.log("sp:", JSON.stringify(sp))
    const submitDuLieu = () => {
        let url = "http://localhost:3500/admin/loai";
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
                        <input type="text" className="form-control" onChange={ e => sp.hinh = e.target.value}/>
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
                <div className='mb-3'>
                    <button 
                        className="btn btn-warning" 
                        type="button" 
                        onClick={ () => submitDuLieu()} 
                    > 
                        Thêm sản phẩm
                    </button> &nbsp;
                    <a href="/admin/sp" className='btn btn-info'>Danh sách</a>
                </div>
            </form>
    )
}
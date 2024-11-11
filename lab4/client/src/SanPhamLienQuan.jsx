import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import {listsp} from './data.js';
import { Link } from "react-router-dom";
import { themSP } from "./cartSlice";

export function SanPhamLienQuan (props) {
    const dispatch = useDispatch();
    const [sps, setSP] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3500/sptrongloai/${props.id_loai}`)
            .then(res => res.json())
            .then(data => {
                setSP(data);
                // console.log(data);
            })
    }, [props.id_loai])
    // const sps = listsp.filter(sp => sp.id_loai == props.id_loai);
    const sotin = 9;
    
    return (
           <div  id="row2">
                <h1 className="fs-4 text-black p-2 bg-white"> SP Liên quan</h1>
                <div className="home"> 
                    {
                        sps.slice(0, sotin).map((sp, i) => (
                            <div className="sp" key={i}>
                                <img src={sp["hinh"]} alt={sp["ten_sp"]}/>
                                <div>
                                    <Link to={ "/sp/" + sp.id } > {sp['ten_sp']} </Link>
                                </div>
                                <p>
                                    <a href="#" onClick={() => dispatch(themSP(sp))}>Thêm vào giỏ</a>
                                </p>
                            </div>
                        ))
                    }
                </div>
           </div>
    )
}

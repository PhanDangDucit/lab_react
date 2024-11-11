import {listsp} from './data.js';
import { Link } from "react-router-dom";

export function SanPhamLienQuan (props) {
    const sps = listsp.filter(sp => sp.id_loai === props.id_loai);
    const sotin = 9;
    return (
           <div  id="row2">
                <h1 className="fs-4 text-black p-2 bg-white"> SP Liên quan</h1>
                <div className="home"> 
                    {
                        sps.slice(0, sotin).map((sp, i) => (
                            <div className="sp" key={i}>
                                <img src={sp["hinh"]} alt={sp["ten_sp"]}/>
                                <Link to={ "/sp/" + sp.id_sp } > {sp['ten_sp']} </Link>
                            </div>
                        ))
                    }
                </div>
           </div>
    )
}

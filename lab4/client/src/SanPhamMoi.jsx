import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { listsp } from "./data";

function SanPhamHot() {
    const [sps, setSP] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3500/sphot`)
            .then(res => res.json())
            .then(data => {
                setSP(data);
                console.log(data);
            })
    }, [])
    // const sanphamHost = listsp.filter((sp) => {
    //     return sp.hot == 1
    // });

    let jsxcode = <div id="spxn">
        <h1 className="fs-4 bg-black text-white p-2">Sản Phẩm Hot</h1>
        {
            sps.slice(0,6).map((sp, i) => (
                <div className="sp" key={i}>
                   <Link to={`/sp/${sp.id}`}>
                        {sp["ten_sp"]}
                        -{sp["ngay"]}
                   </Link>
                </div>
            ))
        }
    </div>
    return ( jsxcode )
}

export default SanPhamHot;
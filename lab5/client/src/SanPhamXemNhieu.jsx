import { listsp } from "./data";
import { Link } from "react-router-dom";

function SanPhamXemNhieu(props) {
    const sortXemNhieu = listsp.sort((a, b) => {
        return b.soluotxem - a.soluotxem
    });

    let jsxcode = <div id="spxn">
        <h1 className="fs-4 bg-black text-white p-2">San Pham Xem Nhieu</h1>
        {
            sortXemNhieu.slice(0, props.sotin).map((sp, i) => (
                <div className="sp" key={i}>
                    <Link to={ "/sp/" + sp.id_sp } > {sp['ten_sp']} </Link>
                </div>
            ))
        }
    </div>
    return ( jsxcode )
}

export default SanPhamXemNhieu;
import { listsp } from "./data";

function SanPhamXemNhieu() {
    const sortXemNhieu = listsp.sort((a, b) => {
        return b.soluotxem - a.soluotxem
    });

    let jsxcode = <div id="spxn">
        <h1 className="fs-4 bg-black text-white p-2">San Pham Xem Nhieu</h1>
        {
            sortXemNhieu.slice(0,6).map((sp, i) => (
                <div className="sp" key={i}>
                    {sp["ten_sp"]}
                </div>
            ))
        }
    </div>
    return ( jsxcode )
}

export default SanPhamXemNhieu;
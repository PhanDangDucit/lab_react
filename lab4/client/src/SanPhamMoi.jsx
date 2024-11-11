import { listsp } from "./data";

function SanPhamHot() {
    const sanphamHost = listsp.filter((sp) => {
        return sp.hot == 1
    });

    let jsxcode = <div id="spxn">
        <h1 className="fs-4 bg-black text-white p-2">Sản Phẩm Hot</h1>
        {
            sanphamHost.slice(0,6).map((sp, i) => (
                <div className="sp" key={i}>
                    {sp["ten_sp"]}
                    -{sp["ngay"]}
                </div>
            ))
        }
    </div>
    return ( jsxcode )
}

export default SanPhamHot;
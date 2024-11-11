import { useParams } from "react-router-dom";
import { listloai, listsp } from "./data";
import { Link } from "react-router-dom";

export function SPTrongLoai() {
    let { id_loai } = useParams();
    let list_sp = listsp.filter( sp => sp.id_loai === id_loai)
    let loai = listloai.find( loai => loai.id_loai === id_loai);

    return (
        <div id="listsp">
            <h1> Sản phẩm trong loại {loai['ten_loai']} </h1>
            <div id="data">
                {list_sp.map( (sp, index) => 
                    <div className="sp" key={index}>
                        <h4> <Link to={ "/sp/" + sp.id_sp } > {sp['ten_sp']} </Link> </h4>
                        <img src = {sp['hinh']} alt= {sp['ten_sp']}/>
                    </div>
                )}
            </div>
        </div>
    )
}
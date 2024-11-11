import { useParams } from "react-router-dom";
// import { listloai, listsp } from "./data";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';

function HienSPTrongMotTrang({ spTrongTrang }) {
    return (
        <div id="data">
            { 
                spTrongTrang.map( (sp, index)=>{ 
                    return (
                    <div className="sp" key={index}>
                    <h4> <Link to = { "/sp/" + sp.id_sp } > {sp['ten_sp']} </Link> </h4>
                    <img src= {sp['hinh']} alt= {sp['ten_sp']} />
                    </div> 
                )})//map
            }
        </div>
    );
} //HienSPTrongMotTrang
  
function PhanTrang({ listSP, pageSize }) {
    const [fromIndex, setfromIndex] = useState(0);
    const toIndex = fromIndex + pageSize;
    const spTrong1Trang = listSP.slice(fromIndex, toIndex);
    const tongSoTrang = Math.ceil(listSP.length / pageSize);
    const chuyenTrang = (event) => {
      const newIndex = (event.selected * pageSize) % listSP.length;
      setfromIndex(newIndex);
    };
    return (
        <div> 
            <HienSPTrongMotTrang spTrongTrang={spTrong1Trang} />
            <ReactPaginate nextLabel=">" previousLabel="<" pageCount={tongSoTrang} 
                pageRangeDisplayed={5} onPageChange={chuyenTrang} className="thanhphantrang" 
            />
        </div>
    );
}//PhanTrang

export function SPTrongLoai() {
    let { id_loai } = useParams();
    // let list_sp = listsp.filter( sp => sp.id_loai === id_loai)
    // let loai = listloai.find( loai => loai.id_loai === id_loai);
    const [list_sp, ganListSP] = useState( [] );
    const [loai, ganLoai] = useState("");
    useEffect( () => {
        fetch(`http://localhost:3500/sptrongloai/${id_loai}`)
            .then( res => res.json()).then( data => ganListSP(data) );

        fetch(`http://localhost:3500/loai/${id_loai}`)
            .then( res => res.json())
            .then(([{id, ten_loai}]) => ganLoai({id, ten_loai}));
    } , [id_loai] );
  
    return (
        <div id="listsp">
            <h1> Sản phẩm trong loại {loai['ten_loai']} </h1>
            {/* <div id="data">
                {list_sp.map( (sp, index) => 
                    <div className="sp" key={index}>
                        <h4> <Link to={ "/sp/" + sp.id_sp } > {sp['ten_sp']} </Link> </h4>
                        <img src = {sp['hinh']} alt= {sp['ten_sp']}/>
                    </div>
                )}
            </div> */}
            <PhanTrang listSP={list_sp} pageSize={6} />
        </div>
    )
}
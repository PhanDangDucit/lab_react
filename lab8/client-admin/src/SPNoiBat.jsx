import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SPNoiBat() {
    const [sps, setSP] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3500/sphot`)
            .then(res => res.json())
            .then(data => {
                setSP(data);
                console.log(data);
            })
    }, [])

    let jsxcode = <div id="spxn">
        <h1 className="fs-4 bg-black text-white p-2">Sản Phẩm Hot</h1>
                {/* <div className="sp" key={i}>
                   <Link to={`/sp/${sp.id}`}>
                        {sp["ten_sp"]}
                        -{sp["ngay"]}
                   </Link>
                </div> */}
       <div className="row">
            {
                sps.map((sp, i) => (
                    <div className="card col-4" key={i}>
                        <img src={sp["hinh"]} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{sp["ten_sp"]}</h5>
                            <p className="card-text">{Number(sp.gia).toLocaleString("usd")} usd</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                ))
            }
       </div>
    </div>
    return ( jsxcode )
}

export default SPNoiBat;
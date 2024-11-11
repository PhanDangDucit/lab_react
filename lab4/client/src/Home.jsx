import { Link } from "react-router-dom";
// import { listsp  } from "./data";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { themSP } from "./cartSlice";

function Home () {
    const [listsp, ganListSP] = useState([]);
    const dispatch = useDispatch();

    useEffect( () => {
        fetch("http://localhost:3500/spmoi/9")
            .then(res => res.json())
            .then( data => ganListSP(data))
    }, [])
    
    return (
        <>
            <h1 className="fs-4 bg-white text-black p-2">Home</h1>
            <div className="home">
                {listsp.slice(0, 6).map((sp, i) => (
                    <div className="sp" key={i}>
                        <h4>
                            <Link to={ "/sp/" + sp.id_sp } > {sp['ten_sp']} </Link>
                        </h4>
                        <img src={sp["hinh"]} alt={sp["ten_sp"]}/>
                        <p>
                            <a href="#" onClick={() => dispatch(themSP(sp))}>Thêm vào giỏ</a>
                        </p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home;
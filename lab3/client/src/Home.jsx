import { Link } from "react-router-dom";
// import { listsp  } from "./data";
import { useEffect, useState } from "react";

function Home () {
    const [listsp, ganListSP] = useState([]);

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
                        <Link to={ "/sp/" + sp.id } > {sp['ten_sp']} </Link>
                        <img src={sp["hinh"]} alt={sp["ten_sp"]}/>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home;
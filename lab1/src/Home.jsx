import { listsp  } from "./data";

function Home () {
    return (
        <>
            <h1 className="fs-4 bg-white text-black p-2">Home</h1>
            <div className="home">
                {listsp.slice(0, 6).map((sp, i) => (
                    <div className="sp" key={i}>
                        <a href={`/sanpham/${sp["ten_sp"]}`}>
                            <h4>{sp["ten_sp"]}</h4>
                        </a>
                        <img src={sp["hinh"]} alt={sp["ten_sp"]}/>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home;
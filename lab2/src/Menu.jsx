import React from "react";
import { listloai } from "./data.js";
import { Link } from "react-router-dom";

class Menu extends React.Component {
    render() {
        return (
            <ul>
                <li><Link to={"/"}> Trang chủ </Link></li>
                {
                    listloai.map((loai, i) => (
                        <li key={i}><Link to= {"/loai/"+ loai.id_loai} > {loai.ten_loai} </Link></li>
                    )) 
                }
                <li> <Link to= "/gioithieu" > Giới thiệu </Link> </li>
            </ul>
        )
    }
}

export default Menu;
import React from "react";
import { listloai } from "./data.js";

class Menu extends React.Component {
    render() {
        return (
            <ul>
                <li><a href="#/"> Trang chủ </a></li>
                {
                    listloai.map((load, i) => (
                        <li key={i}>{load.ten_loai}</li>
                    )) 
                }
            </ul>
        )
    }
}

export default Menu;
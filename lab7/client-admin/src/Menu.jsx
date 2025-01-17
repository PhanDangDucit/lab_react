import React from "react";
import { Link } from "react-router-dom"

class Menu extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="#">I-Tech</Link>
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarSupportedContent" 
                        aria-controls="navbarSupportedContent" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="#">Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Quản lý loại
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" href="#">Thêm loại</Link></li>
                                    <li><Link className="dropdown-item" href="#">Danh sách loại</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Quản lý người dùng
                                </Link>
                                <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/admin/nguoidung">Danh sách người dùng</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Quản lý sản phẩm
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/admin/spthem">Thêm sản phẩm</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/sp">Danh sách sản phẩm</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Quản lý đơn hàng
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" href="#">Xem đơn hàng mới</Link></li>
                                    <li><Link className="dropdown-item" href="#">Danh sách đơn hàng</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/download"} >Download</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/dangnhap"} >Đăng nhập</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
export default Menu;
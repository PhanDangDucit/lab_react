import { useDispatch, useSelector } from "react-redux";
import { suaSL, xoaSP } from "./cartSlice";
import { Link } from "react-router-dom";

export default function ShowCart(props) {
    const cart = useSelector(state => state.cart.listSP);
    const dispatch = useDispatch();

    return (
        <div id="giohang">
            <h2>Giỏ hàng của bạn</h2>
            <Link to='/thanhtoan'>Thanh toán</Link>
            {cart.map ((sp, index) => { return (
                <div key={index}>
                    <span>{sp.ten_sp}</span>
                    <input 
                        type="number" 
                        defaultValue={sp.so_luong}
                        onClick={e => dispatch(suaSL([sp.id, e.target.value]))}
                    />
                    <span>{Number(sp.gia).toLocaleString("vi")} VNĐ</span>
                    <span>{Number(sp.gia*sp.so_luong).toLocaleString("vi")} VNĐ</span>
                    <span>
                        <a href="#" onClick={() => dispatch(xoaSP(sp.id))}>
                            Xóa
                        </a>
                    </span>
                </div>
            )})}
        </div>
    );
}

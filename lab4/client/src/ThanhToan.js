import { createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { xoaSP } from "./cartSlice";

export default function ThanhToan() {
    let htRef = createRef();
    let emRef = createRef();
    const cart = useSelector(state => state.cart.listSP);
    const dispatch = useDispatch();
    
    const submitDuLieu = () => {
        let ht = htRef.current.value;
        let em = emRef.current.value
        if (ht ==="" || em ==="") {
            alert('Nhập đủ thông tin bạn ơi'); 
            return;
        }
        if(cart.length === 0) {
            alert("Bạn chưa chọn sản phẩm nào");
            return;
        }
        let url = "http://localhost:3000/luudonhang";
        let tt = {
            ho_ten:htRef.current.value,
            email:emRef.current.value 
        }
        var opt = { 
            method: "post",
            body: JSON.stringify(tt),
            headers: { 'Content-Type': 'application/json'}
        }
        fetch(url, opt)
            .then(res => res.json() )
            .then(data => { 
                if (data.id_dh < 0) console.log("Lỗi lưu đơn hàng", data)
                else {
                    let id_dh = data.id_dh;
                    alert("Đã lưu đơn hàng", id_dh); //luuchitietdonhang (id_dh, cart);
                    luuchitietdonhang(id_dh, cart);
                }
            });
    } //submitDuLieu
    
    const luuchitietdonhang = (id_dh, cart) => {
        let url = "http://localhost:3000/luugiohang";
        cart.forEach(sp => {
        let t = { id_dh: id_dh, id_sp: sp.id, so_luong: sp.so_luong}
        let opt={ method:"post",
            body: JSON.stringify(t),
            headers: { 'Content-Type': 'application/json'}}
            fetch(url,opt)
                .then(res => res.json())
                .then(data => luuxongsp (data))
                .catch(err => console.log('Lỗi lưu sp', sp));
        });
    }
    const luuxongsp = (data) => { 
        dispatch(xoaSP(data.id_sp))
    }

    return (
        <form id="frmthanhtoan" >
            <h2>Thanh toán đơn hàng</h2> 
            <div>
                <label>Họ tên</label> 
                <input type="text" ref={htRef}/>
            </div>     
            <div> 
                <label>Email</label> 
                <input type="email" ref={emRef}/>
            </div>
            <div> 
                <button 
                    type="button" 
                    onClick={()=>submitDuLieu()}
                >
                    Lưu đơn hàng
                </button> 
            </div>
        </form>
    )
}
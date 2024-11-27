import React from "react";
import { useDispatch } from "react-redux";
import { dalogin } from "./authSlice";
import { useNavigate } from "react-router-dom";

function DangNhap() {
    let unRef = React.createRef();
    let pwRef = React.createRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const history = 

    const submitDuLieu = () => { //gửi thông tin đăng nhập lên server 
        if (unRef.current.value ===  "" || pwRef.current.value === "") {
            alert("Nhập đủ thông tin nhe bạn ơi "); return;
        }
        let url = "http://localhost:3500/login";
        let tt = {un:unRef.current.value, pw:pwRef.current.value }
        var opt = {
            method: "post",
            body: JSON.stringify(tt),
            headers: { 'Content-Type': 'application/json'}
        }
        fetch(url, opt)
            .then(res => res.json() )
            .then(data => { 
                console.log(data);
                dispatch(dalogin(data));

                // useHistory at here
                navigate("/");
            });
    }
    return (
        <form id="frmlogin" className="col-7 m-auto border border-primary">
            <h2 className="bg-info h5 p-2">Thành viên đăng nhập</h2>
            <div className="m-3">
                Tên đăng nhập <input className="form-control" type="text" ref={unRef} />
            </div>
            <div className="m-3">
                Mật khẩu <input className="form-control" type="password" ref={pwRef} />
            </div>
            <div className="m-3">
                <button 
                    className="btn btn-info" 
                    type="button"
                    onClick={() => submitDuLieu()}
                >
                    Đăng nhập
                </button> 
            </div>
        </form>
    )
}
export default DangNhap;
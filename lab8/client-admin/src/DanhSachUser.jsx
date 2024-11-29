import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "./Pagination";
import { useNavigate } from 'react-router'
import SPNoiBat from "./SPNoiBat";

export function DanhSachUser() {
    const [users, ganUsers] = useState([]);
    // user: name, email, email_verified_at, password, dia_chi, dien_thoai, hinh, role, 
        // remember_token, created_at, updated_at, google_id
    const navigate =  useNavigate();
    const [limit] = useState(5);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:3500/admin/users?limit=${limit}&offset=${offset}`)
            .then(res => res.json())
            .then(data => ganUsers(data))
    }, [offset]);

    const xoaSP = (id) => {
        if (window.confirm('Xóa thật không bồ')===false) return false;
        fetch(`http://localhost:3500/admin/user/${id}`, {
            method: "delete"
        })
            .then(res => res.json())
            .then(() => {
                const newList = users.filter(user => user.id !== id);
                ganUsers(newList);
                navigate(0)
            });
    };
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">Email</th>
                        <th scope="col">Ngày tạo</th>
                        <th scope="col">Ngày sửa</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Điện thoại</th>
                        <th scope="col">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map( (user, index) => (
                        <tr key={index}>
                            <th>{index}</th>
                            <td>{user.name}</td>
                            <td>
                                <div className="">
                                    <img src={user["hinh"]} className="rounded" width={100}/>
                                </div>
                            </td>
                            <td>{user.email}</td>
                            <td>{new Date(user.created_at).toLocaleDateString('vi')}</td>
                            <td>{new Date(user.updated_at).toLocaleDateString('vi')}</td>
                            <td>{user.dia_chi}</td>
                            <td>{user.dien_thoai}</td>
                            <td>{user.role}</td>
                            <td className="d-flex">
                                {/* <button type="button" className='btn btn-danger' onClick={()=>xoaSP(user.id)} >Xóa</button> */}
                                <Link to={"/admin/usersua/"+ user.id} className='btn btn-primary' >Sửa</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination 
                offset={offset} 
                setOffset={setOffset}
                limit={limit}
            />
            <SPNoiBat />
        </>
    );
}
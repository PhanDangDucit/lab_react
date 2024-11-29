import { ThemLoaiSP } from './ThemLoai.jsx';
import { DanhSachLoai } from './DanhSachLoai.jsx';
import { LoaiSua } from './LoaiSua.jsx';
import Admin from './Admin';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsX';
import DangNhap from './DangNhap.jsx';
import { Download } from './Download.jsx';
import SanPhamList from './SanPhamList';
import SanPhamThem from './SanPhamThem';
import { SanPhamSua } from './SanPhamSua';
import { NotFound } from './NotFound';
import { useSelector } from "react-redux"
import { DanhSachUser } from './DanhSachUser.jsx';


export function Router () {
    const daDangNhap = useSelector(state => state.auth.daDangNhap);
    return (
        <Routes>
          <Route element={<ProtectedRoute/>}>
            <Route path="/admin/sp" element={<SanPhamList/>} />
            <Route path="/admin/spthem" element={<SanPhamThem/>} />
            <Route path="/admin/spsua/:id" element={<SanPhamSua/>} />
            <Route path="/admin/nguoidung" element={<DanhSachUser/>} />
            <Route path="/admin/themloai" element={<ThemLoaiSP/>} />
            <Route path="/admin/loai" element={<DanhSachLoai/>} />
            <Route path="/admin/loaisua/:id" element={<LoaiSua/>} />
            <Route path="/" exact element={<Admin/>} />
          </Route>
          <Route path="/dangnhap" element={<DangNhap/>} />
          <Route path="/download" element={daDangNhap == true ? <Download/> : <Navigate to="/dangnhap"/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
    )
} 
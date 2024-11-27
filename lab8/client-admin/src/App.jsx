import Header from './Header';
import { dataContext } from './dataContext.jsx';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Admin from './Admin';
import './App.css';
import { NotFound } from './NotFound';
import Menu from './Menu';
import SanPhamList from './SanPhamList';
import SanPhamThem from './SanPhamThem';
import { SanPhamSua } from './SanPhamSua';
import NguoiDungList from './NguoiDungList';
import { useSelector } from "react-redux"
import DangNhap from './DangNhap.jsx';
import { Download } from './Download.jsx';
import ProtectedRoute from './ProtectedRoute.jsX';
import { useContext } from 'react';
import { Footer } from './Footer.jsx';
import { ThemLoaiSP } from './ThemLoai.jsx';

function App() {
  // const user = useSelector(state => state.auth.user);
  const daDangNhap = useSelector(state => state.auth.daDangNhap);
  const data = useContext(dataContext);
  return (
    <>
      <BrowserRouter basename="/">
        <dataContext.Provider value={data} >
          <div className='container'>
            <Header/>
            <Menu/>
          </div>
        </dataContext.Provider>
       <div className='container mt-5'>
          <Routes>
            <Route element={<ProtectedRoute/>}>
              <Route path="/admin/sp" element={<SanPhamList/>} />
              <Route path="/admin/spthem" element={<SanPhamThem/>} />
              <Route path="/admin/spsua/:id" element={<SanPhamSua/>} />
              <Route path="/admin/nguoidung" element={<NguoiDungList/>} />
              <Route path="/admin/themloai" element={<ThemLoaiSP/>} />
              <Route path="/" exact element={<Admin/>} />
            </Route>
            <Route path="/dangnhap" element={<DangNhap/>} />
            <Route path="/download" element={daDangNhap == true ? <Download/> : <Navigate to="/dangnhap"/>} />
            <Route path='*' element={<NotFound/>} />
          </Routes>
          <Footer/>
       </div>
      </BrowserRouter>
    </>
  )
}
export default App;
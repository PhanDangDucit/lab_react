import Admin from './Admin';
import './App.css';
import { BrowserRouter,Routes, Route, Navigate } from "react-router-dom";
import { NotFound } from './NotFound';
import Menu from './Menu';
import SanPhamList from './SanPhamList';
import SanPhamThem from './SanPhamThem';
import SanPhamSua from './SanPhamSua';
// import Header from './Header';
import NguoiDungList from './NguoiDungList';
import { useSelector } from "react-redux"
import DangNhap from './DangNhap.jsx';
import { Download } from './Download.jsx';
import ProtectedRoute from './ProtectedRoute.jsX';

export default function App() {
  const user = useSelector(state => state.auth.user);
  const daDangNhap = useSelector(state => state.auth.daDangNhap);

  return (
      <BrowserRouter basename="/">
        <div className="container">
          <div className="container">
            <header> 
              <div id="useinfo">
                {user == null || user === undefined ? "chào quý khách" : "Chào" + user.hoten}
              </div>
              {/* <Header/>  */}
            </header>
            <nav> <Menu /> </nav>
  
            <main>
            <Routes>
              <Route element={<ProtectedRoute/>}>
                <Route path="/admin/sp" element={<SanPhamList/>} />
                <Route path="/admin/spthem" element={<SanPhamThem/>} />
                <Route path="/admin/:id" element={<SanPhamSua/>} />
                <Route path="/admin/nguoidung" element={<NguoiDungList/>} />
                <Route path="/" exact element={<Admin/>} />
              </Route>
              <Route path="/dangnhap" element={<DangNhap/>} />
              <Route path="/download" element={daDangNhap == true ? <Download/> : <Navigate to="/dangnhap"/>} />
              <Route path='*' element={<NotFound/>} />
            </Routes>
  
            </main>
            <footer>
              <p>Họ tên sinh viên: xxx</p> 
            </footer>
          </div>
        </div>
      </BrowserRouter>
  );
}

import Admin from './Admin';
import './App.css';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import { NotFound } from './NotFound';
import Menu from './Menu';
import SanPhamList from './SanPhamList';
import SanPhamThem from './SanPhamThem';
import SanPhamSua from './SanPhamSua';
import Header from './Header';
import NguoiDungList from './NguoiDungList';

export default function App() {
  return (
    <BrowserRouter basename="/">
      <div className="container">
        <div className="container">
          <header> <Header/> </header>
          <nav> <Menu /> </nav>

          <main>
          <Routes>
            <Route path="/" exact element={<Admin/>} />
            <Route path="/admin/sp" element={<SanPhamList/>} />
            <Route path="/admin/spthem" element={<SanPhamThem/>} />
            <Route path="/admin/nguoidung" element={<NguoiDungList/>} />
            <Route path="/admin/:id" element={<SanPhamSua/>} />
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

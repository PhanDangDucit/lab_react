import { ChiTiet } from "./ChiTiet.jsx"
import { Footer } from "./Footer.jsx"
import GioiThieu from "./GioiThieu.jsx"
import Header from "./Header.jsx"
import Home from "./Home.jsx"
import Menu from "./Menu.jsx"
import { NotFound } from "./NotFound.jsx"
import SanPhamMoi from "./SanPhamMoi.jsx"
import SanPhamXemNhieu from "./SanPhamXemNhieu.jsx"
import { BrowserRouter,Routes, Route } from "react-router-dom";
import { SPTrongLoai } from "./SPTrongLoai.jsx"
import { TimKiem } from "./TimKiem.jsx"
import ShowCart from "./ShowCart.jsx"
import ThanhToan from "./ThanhToan.jsx"
import { Provider } from "react-redux"
import { store } from "./store.js"
import { ThankYou } from "./ThankYou.jsx"

function App() {
  const sotin = 10;
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
          <div className="container">
            <header>
              <Header/>
            </header>
            <nav>
              <Menu/>
            </nav>
            <main className='d-flex'>
              <article className='col-md-9'>
                <Routes>
                  <Route path="/" exact element={<Home/>} />
                  <Route path="/gioithieu" element={<GioiThieu/>} />
                  <Route path="/sp/:id" element={<ChiTiet/>} />
                  <Route path="/loai/:id_loai" element={<SPTrongLoai/>} />
                  <Route path="/timkiem/" element={<TimKiem/>} />
                  <Route path="/showcart/" element={<ShowCart/>} />
                  <Route path="/thanhtoan/" element={<ThanhToan/>} />
                  <Route path="/camon/" element={<ThankYou/>} />
                  <Route element={<NotFound/>}/>
                </Routes>
              </article>
              <aside className='col-md-3'>
                <SanPhamXemNhieu sotin={sotin}/>
                <SanPhamMoi/>
              </aside>
            </main>
            <footer>
              <p className="text-center">Họ tên sinh viên: Phan Đăng Đức</p> 
              <Footer/>
            </footer>
          </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App

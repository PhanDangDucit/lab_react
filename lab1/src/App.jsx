import { Footer } from "./Footer.jsx"
import Header from "./Header.jsx"
import Home from "./Home.jsx"
import Menu from "./Menu.jsx"
import SanPhamMoi from "./SanPhamMoi.jsx"
import SanPhamXemNhieu from "./SanPhamXemNhieu.jsx"

function App() {
  return (
    <div className="container">
      <header>
        <Header/>
      </header>
      <nav>
        <Menu/>
      </nav>
      <main className='d-flex'>
        <article className='col-md-9'>
          <Home/> 
        </article>
        <aside className='col-md-3'>
          <SanPhamXemNhieu/>
          <SanPhamMoi/>
        </aside>
      </main>
      <footer>
        <p className="text-center">Họ tên sinh viên: Phan Đăng Đức</p> 
        <Footer/>
      </footer>
    </div>
  )
}

export default App

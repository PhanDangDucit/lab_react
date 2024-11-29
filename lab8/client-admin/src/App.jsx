import Header from './Header';
import { dataContext } from './dataContext.jsx';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import Menu from './Menu';
import { useContext } from 'react';
import { Footer } from './Footer.jsx';
import { Router } from './Routes.jsx';

function App() {
  // const user = useSelector(state => state.auth.user);
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
          <Router/>
          <Footer/>
       </div>
      </BrowserRouter>
    </>
  )
}
export default App;
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            {/* TopNav */}
            <nav className="navbar navbar-expand-lg bg-body">
                <div className="container-fluid">
                    <button data-mdb-collapse-init className="navbar-toggler" type="button" data-mdb-target="#navbarExample01" aria-controls="navbarExample01" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarExample01">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item active">
                            <a className="nav-link" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        </ul>
                    </div>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
                <Link to="/showcart">Cart</Link> 
            </nav>
            {/* Background image */}
            <div 
                className="p-5 text-center bg-image" 
                style={{
                    backgroundImage: 'url("https://www.ituonline.com/wp-content/uploads/2023/10/What-Does-It-Mean-for-Computers.jpg")',
                    height: 400
                }}
            />
        </>
    )
}
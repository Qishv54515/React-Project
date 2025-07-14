import { Link } from "react-router-dom"

const navbarStyle = {
    background: 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 20%, rgba(0,212,255,1) 100%)',
    padding: '1rem 2rem',
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    textAlign: 'center',
};

const linkStyle = {
    color: '#61dafb',
    textDecoration: 'none',
    fontSize: '1.2rem',
    transition: 'color 0.2s',
};

const Header = () => {
    return (
        <nav style={navbarStyle}>
            <Link to="/" style={linkStyle}>App1</Link>
            <Link to="/about" style={linkStyle}>App2</Link>
             <Link to="/Todolist" style={linkStyle}>Todolist</Link>
        </nav>
    );
}
export default Header;
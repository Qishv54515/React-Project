import { Link } from "react-router-dom"

const navbarStyle = {
    background: '#282c34',
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
        </nav>
    );
}
export default Header;
import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';
import search_icon from '../assets/search_icon.svg';
import cart_icon from '../assets/cart_icon.png';
import login from '../assets/login.png';
import { useClerk, useUser, UserButton } from '@clerk/clerk-react';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState("");
  const location = useLocation(); // Track current route
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { getTotalCartItems } = useContext(ShopContext);

  // Update active menu based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === "/new") setMenu("new");
    else if (path === "/bestseller") setMenu("bestseller");
    else if (path === "/kurti") setMenu("kurti");
    else if (path === "/more") setMenu("more");
    else if (path === "/sale") setMenu("sale");
    else setMenu(""); // Home or other pages
  }, [location]);

  return (
    <div className='navbar'>
      {/* Left Side */}
      <div className="navbar-left">
        <Link to="/" onClick={() => setMenu("")}>
          <img src={logo} alt="logo" className="navbar-logo" />
        </Link>

        <ul>
          <li onClick={() => setMenu("new")}>
            <Link to='/new' style={{ textDecoration: 'none' }}>New</Link>
            {menu === "new" && <hr />}
          </li>
          <li onClick={() => setMenu("bestseller")}>
            <Link to='/bestseller' style={{ textDecoration: 'none' }}>Bestseller</Link>
            {menu === "bestseller" && <hr />}
          </li>
          <li onClick={() => setMenu("kurti")}>
            <Link to='/kurti' style={{ textDecoration: 'none' }}>Kurti</Link>
            {menu === "kurti" && <hr />}
          </li>
          <li onClick={() => setMenu("more")}>
            <Link to='/more' style={{ textDecoration: 'none' }}>More</Link>
            {menu === "more" && <hr />}
          </li>
          <li onClick={() => setMenu("sale")}>
            <Link to='/sale' style={{ textDecoration: 'none' }}>Sale</Link>
            {menu === "sale" && <hr />}
          </li>
        </ul>
      </div>

      {/* Right Side */}
      <div className="navbar-right">
        <Link to="/search">
          <img src={search_icon} alt="search" className='icons' />
        </Link>
        <Link to="/cart" className="cart-link">
          <img src={cart_icon} alt="cart" className='icons' />
          {getTotalCartItems() > 0 && (
            <span className="cart-count">{getTotalCartItems()}</span>
          )}
        </Link>
        <p>Girls Section</p>

        <div className="navbar-rightright">
          {user ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <button onClick={() => openSignIn()} className="login-btn">
              <img src={login} alt="login" className='login-icon' />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

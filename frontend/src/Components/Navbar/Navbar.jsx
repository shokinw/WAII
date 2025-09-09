import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";
import search_icon from "../assets/search_icon.svg";
import cart_icon from "../assets/cart_icon.png";
import login_icon from "../assets/login.png";
import { ShopContext } from "../../Context/ShopContext";
import AuthModal from "../AuthModal/AuthModal";

const Navbar = () => {
  const [menu, setMenu] = useState("");
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const location = useLocation();
  const { getTotalCartItems } = useContext(ShopContext);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Track active route
  useEffect(() => {
    const path = location.pathname;
    if (path === "/new") setMenu("new");
    else if (path === "/bestseller") setMenu("bestseller");
    else if (path === "/kurti") setMenu("kurti");
    else if (path === "/more") setMenu("more");
    else if (path === "/sale") setMenu("sale");
    else setMenu("");
  }, [location]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/"; // back to home
  };

  return (
    <div className="navbar">
      {/* Left */}
      <div className="navbar-left">
        <Link to="/" onClick={() => setMenu("")}>
          <img src={logo} alt="logo" className="navbar-logo" />
        </Link>

        <ul>
          <li onClick={() => setMenu("new")}>
            <Link to="/new">New</Link>
            {menu === "new" && <hr />}
          </li>
          <li onClick={() => setMenu("bestseller")}>
            <Link to="/bestseller">Bestseller</Link>
            {menu === "bestseller" && <hr />}
          </li>
          <li onClick={() => setMenu("kurti")}>
            <Link to="/kurti">Kurti</Link>
            {menu === "kurti" && <hr />}
          </li>
          <li onClick={() => setMenu("more")}>
            <Link to="/more">More</Link>
            {menu === "more" && <hr />}
          </li>
          <li onClick={() => setMenu("sale")}>
            <Link to="/sale">Sale</Link>
            {menu === "sale" && <hr />}
          </li>
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-right">
        <Link to="/search">
          <img src={search_icon} alt="search" className="icons" />
        </Link>

        <Link to="/cart" className="cart-link">
          <img src={cart_icon} alt="cart" className="icons" />
          {getTotalCartItems() > 0 && (
            <span className="cart-count">{getTotalCartItems()}</span>
          )}
        </Link>

        <p>Girls Section</p>

        <div className="navbar-rightright">
          {user ? (
            <>
              <span className="user-name">Hi, {user.name}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setAuthOpen(true)}
              className="login-btn"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <img src={login_icon} alt="login" className="login-icon" />
            </button>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      {authOpen && (
        <AuthModal
          type="login"
          onClose={() => setAuthOpen(false)}
          onSuccess={(loggedInUser) => {
            setUser(loggedInUser);
            setAuthOpen(false);
            window.location.href = "/"; // back home after login
          }}
        />
      )}
    </div>
  );
};

export default Navbar;

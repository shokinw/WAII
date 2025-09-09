import { useState } from "react"; // ✅ Import useState
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";   
import CartPage from "./Pages/CartPage";
import SearchPage from "./Pages/SearchPage";
import CheckoutPage from "./Pages/CheckoutPage";
import Footer from "./Components/Footer/Footer";
import Big from "./Components/Big/Big";
import Admin from "./Pages/Admin";
import Login from "./Components/Login/Login"; // ✅ Import your login page
import Register from "./Components/Register/Register";
function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* ✅ Conditionally show login popup */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/new" element={<ShopCategory category="new" />} />
          <Route path="/bestseller" element={<ShopCategory category="bestseller" />} />
          <Route path="/kurti" element={<ShopCategory category="kurti" />} />
          <Route path="/more" element={<ShopCategory category="more" />} />
          <Route path="/product/:productID" element={<Product />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} /> {/* ✅ Login route */}
          <Route path="/register" element={<Register />} /> {/* ✅ Register route */}
        </Routes>
        <Big />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

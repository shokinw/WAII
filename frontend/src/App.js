import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Shop from "./Pages/Shop"; // <-- Import Shop
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";   
import CartPage from "./Pages/CartPage";
import SearchPage from "./Pages/SearchPage";
import CheckoutPage from "./Pages/CheckoutPage";
import Footer from "./Components/Footer/Footer";
import Big from "./Components/Big/Big";
import Admin from "./Pages/Admin";
import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file');
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />       {/* <-- Show Shop page at "/" */}
          <Route path="/new" element={<ShopCategory category="new" />} />
          <Route path="/bestseller" element={<ShopCategory category="bestseller" />} />
          <Route path="/kurti" element={<ShopCategory category="kurti" />} />
          <Route path="/more" element={<ShopCategory category="more" />} />
          <Route path="/product/:productID" element={<Product />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Big/>
        <Footer />
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;
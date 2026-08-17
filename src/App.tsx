import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

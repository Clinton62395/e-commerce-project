import React from "react";
import "./App.css";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { LandingPageNavbar } from "./components/navbar";
import { Home } from "./pages/home";
import { SectionPage } from "./pages/page";
import { Deals } from "./landing_pages/deals";
import { Register } from "./pages/sign_up";
import { Login } from "./pages/sign_in";
import { Provider } from "./services/provider";
import { ForgetPassword } from "./pages/forget_password";
import { NewProduct } from "./landing_pages/new_product";
import { Package } from "./landing_pages/package";
import { SlideButton } from "./components/slides-components/slide_button";
import { SlidePagination } from "./components/slides-components/slide_pagination";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <LandingPageNavbar />

        <Routes>
          <Route index element={<Home />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/new-products" element={<NewProduct />} />
          <Route path="/packages" element={<Package />} />
          <Route path="/page" element={<SectionPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />

          <Route path="/slide-button" element={<SlideButton />} />
          <Route path="/slide-pagination" element={<SlidePagination />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

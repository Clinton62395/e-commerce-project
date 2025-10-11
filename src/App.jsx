import React from "react";
import "./App.css";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { Home } from "./pages/home";
import { SectionPage } from "./pages/page";
import { Deals } from "./landing_pages/deals";
import { Register } from "./pages/sign_up";
import { Login } from "./pages/sign_in";
import { Shop } from "./pages/shop";
import { Provider } from "./services/provider";
import { ForgetPassword } from "./pages/forget_password";
import { NewProduct } from "./landing_pages/new_product";
import { Package } from "./landing_pages/package";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Products } from "./pages/products";
import { ShopLayout } from "./outlets/ShopLayout";
import { HomeLayout } from "./outlets/HomeLayout";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Provider>
          <Routes>
            <Route element={<HomeLayout />}>
              <Route index element={<Home />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/new-products" element={<NewProduct />} />
              <Route path="/packages" element={<Package />} />
              <Route path="/page" element={<SectionPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
            </Route>

            <Route element={<ShopLayout />}>
              <Route index element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/products" element={<Products />} />
              <Route path="/shop-page" element={<SectionPage />} />
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;

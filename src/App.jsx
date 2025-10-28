import React from "react";
import "./App.css";
import "./index.css";
import toast, { Toaster } from "react-hot-toast";
import { Home } from "./pages/home";
import { Deals } from "./landing_pages/deals";
import { Register } from "./pages/sign_up";
import { Login } from "./pages/sign_in";
import { FashionShop } from "./pages/shop";
import { Provider } from "./services/provider";
import { ForgetPassword } from "./pages/forget_password";
import { NewProduct } from "./landing_pages/new_product";
import { Package } from "./landing_pages/package";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Products } from "./pages/products";
import { HomeLayout } from "./outlets/HomeLayout";
import { ShopLayout } from "./outlets/ShopLayout";
import { Checkout } from "./landing_pages/checkout";
import { TransactionSuccess } from "./landing_pages/transfer.success";
import { ResetPassword } from "./pages/reset_password";
import NotFound from "./pages/NotFound";
import { Orders } from "./components/dashboard/Orders";
import { Customers } from "./components/dashboard/Customers";
import { Header } from "./components/dashboard/Headers";
import { DashboardProducts } from "./components/dashboard/Products";
import { Analytics } from "./components/dashboard/Analytics";
import { DashboardLayout } from "./outlets/DashboardLayout";
import { Sidebar } from "./components/dashboard/SideBar";
import { AdminDashboard } from "./components/dashboard/adminDahboard";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Provider>
          <Routes>
            <Route element={<HomeLayout />}>
              <Route index element={<Home />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/new-products" element={<NewProduct />} />
              <Route path="/packages" element={<Package />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
            </Route>

            <Route element={<ShopLayout />}>
              <Route index element={<Home />} />
              <Route path="/shop" element={<FashionShop />} />
              <Route path="/product-details" element={<Products />} />

              {/* <Route path="/shoping-cart" element={<ShopingCart />} /> */}
            </Route>
            <Route path="/success" element={<TransactionSuccess />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* <AdminDashboard /> */}
            <Route path="/admin-dashboard" element={<DashboardLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="customers" element={<Customers />} />
              <Route path="header" element={<Header />} />
              <Route path="products" element={<DashboardProducts />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="sidebar" element={<Sidebar />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;

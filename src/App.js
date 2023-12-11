import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.css";
import NavBar from "./components/user/NavBar";
import Register from "./page/user/Register";
import Login from "./page/user/Login";
import Home from "./page/user/Home";
import NotFound from "./page/user/NotFound";
import CheckoutSuccess from "./page/user/CheckoutSuccess";
import Dashboard from "./components/admin/Dashboard";
import Products from "./page/admin/Products";
import Orders from "./page/admin/Orders";
import Users from "./page/admin/Users";
import Summary from "./page/admin/Summary";
import ProductList from "./components/admin/products/ProductList";
import Menu from "./page/user/Menu";
import Cart from "./page/user/Cart";
import Profile from "./page/user/Profile";

function App() {
  return (
    <Router>
      <ToastContainer />
      <NavBar />
      <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu/:id" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/order" element={<Profile/>} />
          <Route path="/admin" element={<Dashboard/>} >
            <Route path="summary" element={<Summary/>} />
            <Route path="products" element={<Products/>}>
              <Route index element={<ProductList/>} />
            </Route>
            <Route path="orders" element={<Orders/>} />
            <Route path="users" element={<Users/>} />
          </Route>
          <Route path="/checkout-success" element={<CheckoutSuccess/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
    // <>
    // </>
  );
}

export default App;

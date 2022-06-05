import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Faq from "./pages/Faq";
import Home from "./pages/Home";
import Layout from "./pages/app/Layout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Manage from "./pages/app/Manage";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";
import Onboarding from "./pages/Onboarding";
import { HelmetProvider } from "react-helmet-async";
import Orders from "./pages/app/orders/Orders";
import Products from "./pages/app/products/Products";
import Customers from "./pages/app/customers/Customers";
import Setting from "./pages/app/Setting";
import NewProduct from "./pages/app/products/NewProduct";
import NewOrder from "./pages/app/orders/NewOrder";
import NewCustomer from "./pages/app/customers/NewCustomer";
import Form from "./pages/Form";

function App() {
  return (
    <HelmetProvider>
    <RecoilRoot>
    <ToastContainer />    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="faq" element={<Faq />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="onboarding" element={<Onboarding />} />
        <Route path="form" element={<Form />} />
        <Route path="app" element={<Layout />}>
          <Route index element={<Manage />} />
          <Route path="home" element={<Manage />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/new" element={<NewOrder />} />
          <Route path="products" element={<Products />} />
          <Route path="products/new" element={<NewProduct />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/new" element={<NewCustomer />} />
          <Route path="settings" element={<Setting />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </RecoilRoot>
    </HelmetProvider>
  );
}

export default App;

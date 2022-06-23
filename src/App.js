import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
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
import NewCustomer from "./pages/app/customers/NewCustomer";
import EditCustomer from "./pages/app/customers/EditCustomer";
import EditProduct from "./pages/app/products/EditProduct";
import Storefront from "./pages/Storefront";
import StoreItem from "./pages/StoreItem";
import StoreLayout from "./pages/StoreLayout";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CheckoutModal from "./components/CheckoutModal";
import OrderStatus from "./pages/OrderStatus";
import OrderStatusDetail from "./pages/OrderStatusDetail";
import EditOrder from "./pages/app/orders/EditOrder";
import MobileModal from "./components/MobileModal";

function App() {
  return (
    <HelmetProvider>
      <RecoilRoot>
        <ToastContainer />
        <BrowserRouter>
        <CheckoutModal />
        <MobileModal />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="faq" element={<Faq />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="onboarding" element={<Onboarding />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-status" element={<OrderStatus />} />
            <Route path="order-status/:orderId" element={<OrderStatusDetail />} />
            {/* <Route path=":storeName" element={<Storefront />} /> */}
            <Route path=":storeName" element={<StoreLayout />}>
              <Route index element={<Storefront />} />
              <Route path=":productId" element={<StoreItem />} />
            </Route>
            {/* <Route path="/:storeName/:productId" element={<StoreItem />} /> */}
            <Route path="app" element={<Layout />}>
              <Route index element={<Manage />} />
              <Route path="home" element={<Manage />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:id" element={<EditOrder />} />
              {/* <Route path="orders/new" element={<NewOrder />} /> */}
              <Route path="products" element={<Products />} />
              <Route path="products/new" element={<NewProduct />} />
              <Route path="products/:id" element={<EditProduct />} />
              <Route path="customers" element={<Customers />} />
              <Route path="customers/new" element={<NewCustomer />} />
              <Route path="customers/:id" element={<EditCustomer />} />
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

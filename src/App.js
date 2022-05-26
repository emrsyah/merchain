import { BrowserRouter, Routes, Route } from "react-router-dom";
import Faq from "./pages/Faq";
import Home from "./pages/Home";
import Layout from "./pages/app/Layout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Manage from "./pages/app/Manage";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
    <ToastContainer />    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="faq" element={<Faq />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="app" element={<Layout />}>
          <Route index element={<Manage />} />
          <Route path="home" element={<Manage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;

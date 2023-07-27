import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AdminRoute from "./components/route/AdminRoute";
import UserRoute from "./components/route/UserRoute";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";
import ForgetPassword from "./pages/ForgetPassword";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./pages/PageNotFound";
import Payment from "./pages/Payment";
import PolicyPage from "./pages/PolicyPage";
import ProductDetails from "./pages/ProductDetails";
import RegisterPage from "./pages/RegisterPage";
import ResetPassword from "./pages/ResetPassword";
import Search from "./pages/Search";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AllUsers from "./pages/admin/AllUsers";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import UserDashboard from "./pages/user/UserDashboard";
import UserOrders from "./pages/user/UserOrders";
import UserReview from "./pages/user/UserReview";

function App() {
    // console.log(localStorage.getItem("auth"));
    // const user = useSelector((state) => state.auth);
    // console.log(user);
    return (
        <>
            <Toaster />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search/:keyword" element={<Search />} />
                <Route path="payment" element={<Payment />}/>
                <Route element={<UserRoute />}>
                    <Route path="/user-dashboard" element={<UserDashboard />} />
                    <Route
                        path="/user-dashboard/orders"
                        element={<UserOrders />}
                    />
                    <Route
                        path="/user-dashboard/review"
                        element={<UserReview />}
                    />
                </Route>
                <Route element={<AdminRoute />}>
                    <Route
                        path="/admin-dashboard"
                        element={<AdminDashboard />}
                    />
                    <Route
                        path="/admin-dashboard/products"
                        element={<Products />}
                    />
                    <Route
                        path="/admin-dashboard/create-product"
                        element={<CreateProduct />}
                    />
                    <Route
                        path="/admin-dashboard/product/:slug"
                        element={<UpdateProduct />}
                    />
                    <Route
                        path="/admin-dashboard/create-category"
                        element={<CreateCategory />}
                    />
                    <Route
                        path="/admin-dashboard/all-users"
                        element={<AllUsers />}
                    />
                </Route>
                <Route path="/product/:slug" element={<ProductDetails />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/policy" element={<PolicyPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    );
}


export default App;

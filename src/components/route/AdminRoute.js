import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminRoute = () => {
    const localStorageToken = JSON.parse(localStorage.getItem("auth"))?.user?.role;
    // console.log(localStorageToken);
    const location = useLocation();
    return (
        localStorageToken === "admin" ? (
            <Outlet />
        ) : (
            <Navigate to="/login" state={{from:location}} replace/>
        )
    )
}

export default AdminRoute;
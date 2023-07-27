import { Navigate, Outlet, useLocation } from "react-router-dom";

const UserRoute = () => {
    const localStorageToken = JSON.parse(localStorage.getItem("auth"))?.user?.role;
    const location = useLocation();
    return (
        localStorageToken === "user" ? (
            <Outlet />
        ) : (
            <Navigate to="/login" state={{from:location}} replace/>
        )
    )
}

export default UserRoute;
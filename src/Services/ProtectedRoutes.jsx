import { Route, Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
 const auth = localStorage.getItem("userId");
 return auth ?<Outlet/> :<Navigate to={"/"}/>;
}

export default ProtectedRoute;
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getDetailRole } from "../services/RoleService";

const AdminRoute = () => {
    const { isAuthenticated, userData } = useSelector((state) => state.auth);
    const nameRole = isAuthenticated && userData?.dataLogin?.nameRole;

    if (nameRole === "Customer") {
        return <Navigate to="/not-found" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;

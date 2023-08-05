import { Navigate, Outlet } from "react-router-dom";

function PrivateRouter(): JSX.Element {
    if (isAuthenticated()) return <Outlet />
    return <Navigate to={'/'} />
}

export default PrivateRouter;
function isAuthenticated() {
    const token = localStorage.getItem('guest_token');
    return !!token;
}
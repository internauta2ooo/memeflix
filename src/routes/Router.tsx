import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLogin from "../pages/Auth/AuthLogin/AuthLogin";
import Movies from "../pages/Home/Movies/Movies";
import PrivateRouter from "./PrivateRouter";

const RootRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthLogin />} />
                <Route element={<PrivateRouter />}>
                    <Route path="/movies" element={<Movies />} />
                </Route>

            </Routes>
        </BrowserRouter>

    )
}

export default RootRouter;
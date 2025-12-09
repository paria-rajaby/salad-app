import { createBrowserRouter } from "react-router";
import App from "./App";
import Basket from "./Pages/Basket/Basket"
import Layout from "./Components/Layout/Layout";
import EmptyLayout from "./Components/Layout/EmptyLayout";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />
    },
    {
        path: "/basket",
        element: <EmptyLayout />,
        children:[
            {index: true , element: <Basket />}
        ]
    }
])
export default router
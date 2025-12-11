import { createBrowserRouter } from "react-router";
import Basket from "./Pages/Basket/Basket"
import Layout from "./Components/Layout/Layout";
import EmptyLayout from "./Components/Layout/EmptyLayout";
import Salad from "./Components/Salad/Salad";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
    },
    {
        path: "/basket",
        element: <EmptyLayout />,
        children:[
            {index: true , element: <Basket />}
        ]
    },
    {
        path: "/salad",
        element: <Salad />,
    }
])
export default router
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../Components/AppLayout";
import Error from "../Components/Error";
import Body from "../Components/Body";
import Cart from "../Components/Cart/Cart";
import Main from "../Components/Products/Main";
import Login from "../Components/Login";
 
const useRoute=()=>{
    const router=createBrowserRouter([
        {
            path:'/',
            element:<Login />
        },
        {   
            path:'/',
            element: <AppLayout />,
            errorElement: <Error />,
            children:[
                {
                    path:'/home',
                    element:<Body />
                },
                
                {
                    path:'/products',
                    element:<Main />
                },
                {
                    path:'/cart',
                    element:<Cart />
                }
            ]
            
        },
        
    ]);
    return router;
}
export default useRoute;
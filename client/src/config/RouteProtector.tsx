import { Navigate} from "react-router-dom";

const RouteProtector = ({ children, isAuthenticate }: any) => {
    const token = localStorage.getItem("token");
    if(isAuthenticate){
        if(!token){
            return <Navigate to="/" replace />;
        }
        return children
    }
    else{
        if(token){
            return <Navigate to="/user/home" replace />;
        }
        children
    }
    return children;
};

export default RouteProtector ;



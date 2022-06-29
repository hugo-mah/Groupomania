import { Navigate } from "react-router-dom";

function ProtectedRoute({children}){
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if(!token && !userId){
        return <Navigate to='/login' replace />
    }

    return children;
}

export default ProtectedRoute
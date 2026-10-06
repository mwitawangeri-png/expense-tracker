import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { JSX } from "react/jsx-runtime";

export function ProtectedRoute({ children}: {children: JSX.Element}) {
    const {session} = useAuth();

    if(!session) { // If there is no active session, instantly redirect to the login page
        return <Navigate to="/login" replace />
    }
    return children; // If the user is logged in, render the component they requested
}
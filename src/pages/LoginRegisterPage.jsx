import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Login from "../components/Login";
import Registration from "../components/Registration";

export default function LoginRegisterPage({setUser, setAccess}) {
    const location = useLocation();

    useEffect(() => {
        setAccess(true);
    }, [setAccess]);

    return (
        <section style={{width:"100%"}}>
            { location.pathname === "/register" 
                ? <Registration />
                : <Login setUser={setUser} />
            }
        </section>
    )
};

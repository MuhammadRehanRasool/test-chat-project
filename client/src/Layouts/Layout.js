import React, { useState, useEffect, useContext } from "react";
import UserData from "../Contexts/UserData";

function Layout(props) {
    let __init_session = {
        personal: {
            username: "",
        },
        isLoggedIn: false,
    };
    const [session, setSession] = useState(__init_session);
    useEffect(() => {
        let sessionData = JSON.parse(sessionStorage.getItem("loggedin"));
        if (sessionData) {
            setSession({
                personal: sessionData.data,
                isLoggedIn: true,
            });
        }
    }, []);
    const value = { session, setSession };
    return (
        <UserData.Provider value={value}>{props.children}</UserData.Provider>
    );
}
export default Layout;

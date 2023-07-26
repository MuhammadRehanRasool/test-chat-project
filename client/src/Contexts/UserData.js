import React from "react";

const UserData = React.createContext({
    session: {
        personal: {
            username: "",
        },
        isLoggedIn: false,
    },
    setSession: () => { },
});

export default UserData;

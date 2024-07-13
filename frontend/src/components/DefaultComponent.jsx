import React from "react";
import Header from "../pages/Header/Header";
const DefaultComponent = ({children}) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}
export default DefaultComponent
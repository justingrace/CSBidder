import React from 'react';
import {UserProvider} from "../../UserContext";

const Page = ({children}) => {
    return (
        <UserProvider
            value={{}}>
            <div className="page">{children}</div>
        </UserProvider>
    )
}

export default Page;
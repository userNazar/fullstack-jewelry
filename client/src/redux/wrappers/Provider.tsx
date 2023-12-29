'use client';

import { Provider } from "react-redux";
import { store } from "../index";

const ProviderApp = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default ProviderApp;
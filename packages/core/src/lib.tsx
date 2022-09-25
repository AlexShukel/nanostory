import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

export type NanostoryConfig = {
    stories: string[];
};

export const renderNanostory = ({ stories }: NanostoryConfig) => {
    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
        <React.StrictMode>
            <App stories={stories} />
        </React.StrictMode>
    );
};

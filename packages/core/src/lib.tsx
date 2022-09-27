import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { globalCss } from "./stitches.config";

const globalStyles = globalCss({
    "body, html, #root": {
        width: "100%",
        height: "100%",
        margin: 0,
    },
});

export type NanostoryConfig = {
    stories: string[];
};

export const renderNanostory = ({ stories }: NanostoryConfig) => {
    globalStyles();

    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
        <React.StrictMode>
            <App stories={stories} />
        </React.StrictMode>
    );
};

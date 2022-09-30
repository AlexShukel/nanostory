import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { globalCss } from "./stitches.config";
import "@fontsource/poppins";
import { Story } from "./components/Story";

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

    const router = createBrowserRouter([
        {
            path: "/",
            element: <App stories={stories} />,
            children: [
                {
                    path: "__nanostory_iframe/*",
                    element: <Story />,
                },
            ],
        },
    ]);

    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
};

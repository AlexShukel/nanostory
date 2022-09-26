import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const mockStories = ["Button", "Accordion", "Switch", "TextField", "Avatar"];

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App stories={mockStories} />
    </React.StrictMode>
);

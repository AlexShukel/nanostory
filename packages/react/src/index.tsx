import { ComponentType } from "react";
import { createRoot } from "react-dom/client";

// const ControlledComponent = ({ Component }) => {
//     const [props, setProps] = useState({});

//     useEffect(() => {
//         window.top?.postMessage({ type: "handshake" });
//         window.addEventListener("message", (event) => {
//             if (event.type === "props") {
//                 setProps(event.props);
//             }
//         });
//     }, []);

//     return <Component {...props} />;
// };

export const createStory = <P extends object>(Component: ComponentType<P>, props: P) => {
    return (rootElement: HTMLElement) => {
        const root = createRoot(rootElement);
        root.render(<Component {...props} />);
    };
};

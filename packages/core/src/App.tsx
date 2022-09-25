import { useEffect, useRef } from "react";

export type AppProps = {
    stories: string[];
};

const App = ({ stories }: AppProps) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (iframeRef.current) {
            // TODO Make handshake before sending messages
            // iframeRef.current?.contentWindow?.postMessage("Hello message");
        }
    }, []);

    return (
        <div className="App">
            asdf
            <iframe ref={iframeRef} src={`/__nanostory_iframe?filename=${encodeURI("./" + stories[0])}`} />
        </div>
    );
};

export default App;

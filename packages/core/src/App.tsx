import { useEffect, useRef } from "react";
import { styled } from "./stitches.config";
import { ReactComponent as LogoIcon } from "./assets/logo.svg";
import "./App.css";
import { Sidebar } from "./components/Sidebar";

export type AppProps = {
    stories: string[];
};

const Root = styled("div", {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
    gridTemplateRows: "80px 1fr",
});

const Logo = styled("div", {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    columnGap: "$3",
    padding: "0 $12",
    backgroundColor: "$aside-background",
});

const AppTitle = styled("p", {
    fontWeight: "bold",
    fontSize: "$2xl",
});

const Header = styled("header", {});

const Content = styled("main", {});

const App = ({ stories }: AppProps) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (iframeRef.current) {
            // TODO Make handshake before sending messages
            // iframeRef.current?.contentWindow?.postMessage("Hello message");
            // <iframe ref={iframeRef} src={`/__nanostory_iframe?filename=${encodeURI("./" + stories[0])}`} />
        }
    }, []);

    return (
        <Root>
            <Logo>
                <LogoIcon />
                <AppTitle>Nanostory</AppTitle>
            </Logo>
            <Header>TODO</Header>
            <Sidebar stories={stories} />
            <Content>TODO</Content>
        </Root>
    );
};

export default App;

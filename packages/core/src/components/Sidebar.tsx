import { styled } from "../stitches.config";
import { Link } from "react-router-dom";

const Root = styled("aside", {
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "$aside-background",
});
const Navigation = styled("nav", {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    padding: "$8 $2",
    rowGap: "$2",
    width: "max-content",
});

export const MenuLink = styled(Link, {
    textAlign: "left",
    width: "100%",
    cursor: "pointer",
    borderRadius: "$lg",
    padding: "$2 $4",
    fontFamily: "Poppins, sans-serif",
    variants: {
        variant: {
            selected: {
                backgroundColor: "$selected",
            },
        },
    },
});

const getStoryName = (story: string) => {
    return story.slice(story.lastIndexOf("/") + 1, story.lastIndexOf(".stories"));
};

export type SideBarProps = {
    stories: string[];
};

export const Sidebar = ({ stories }: SideBarProps) => {
    return (
        <Root>
            <Navigation>
                {stories.map((storyPath, index) => {
                    const componentName = getStoryName(storyPath);

                    return (
                        <MenuLink
                            // variant={index === selectedIndex ? "selected" : undefined}
                            key={index}
                            to={`__nanostory_iframe/${encodeURI("./" + storyPath)}`}
                        >
                            {componentName}
                        </MenuLink>
                    );
                })}
            </Navigation>
        </Root>
    );
};

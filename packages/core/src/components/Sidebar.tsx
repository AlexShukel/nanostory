import { useState } from "react";
import { styled } from "../stitches.config";

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

export const MenuLink = styled("a", {
    textAlign: "left",
    width: "100%",
    cursor: "pointer",
    borderRadius: "$lg",
    padding: "$2 $4",
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
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <Root>
            <Navigation>
                {stories.map((story, index) => (
                    <MenuLink
                        onClick={() => {
                            setSelectedIndex(index);
                        }}
                        variant={index === selectedIndex ? "selected" : undefined}
                        key={index}
                    >
                        {getStoryName(story)}
                    </MenuLink>
                ))}
            </Navigation>
        </Root>
    );
};

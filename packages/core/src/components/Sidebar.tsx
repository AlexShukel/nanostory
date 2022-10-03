import { styled } from "../stitches.config";
import { Link, useLocation } from "react-router-dom";
import { getStoryName, getStoryNameFromSplat } from "../pathUtils";

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
    color: "$link",
    textDecoration: "none",
    variants: {
        variant: {
            selected: {
                backgroundColor: "$selected",
            },
        },
    },
});

export type SideBarProps = {
    stories: string[];
};

export const Sidebar = ({ stories }: SideBarProps) => {
    const location = useLocation();

    const currentComponentName = getStoryNameFromSplat(location.pathname);

    return (
        <Root>
            <Navigation>
                {stories.map((storyPath, index) => {
                    const componentName = getStoryName(storyPath);

                    return (
                        <MenuLink
                            variant={currentComponentName === componentName ? "selected" : undefined}
                            key={index}
                            to={`components/${componentName}`}
                        >
                            {componentName}
                        </MenuLink>
                    );
                })}
            </Navigation>
        </Root>
    );
};

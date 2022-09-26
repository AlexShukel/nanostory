import { styled } from "../stitches.config";

const Root = styled("aside", {});
const Navigation = styled("nav", {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    paddingTop: "$4",
});

export const MenuLink = styled("a", {});

export type SideBarProps = {
    stories: string[];
};

export const Sidebar = ({ stories }: SideBarProps) => {
    return (
        <Root>
            <Navigation>
                {stories.map((story) => (
                    <MenuLink>{story}</MenuLink>
                ))}
            </Navigation>
        </Root>
    );
};

import { useParams } from "react-router-dom";
import { getStoryName, getStoryNameFromSplat } from "../pathUtils";

export type StoryProps = {
    stories: Record<string, string>;
};

export const Story = ({ stories }: StoryProps) => {
    const { "*": splat } = useParams();

    if (!splat) {
        return null;
    }

    const storyName = getStoryNameFromSplat(splat);

    const story = Object.entries(stories).find(([key]) => getStoryName(key) === storyName);

    if (!story) {
        return null;
    }

    return <iframe src={`/${story[1]}`} />;
};

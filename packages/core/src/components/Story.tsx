import { useParams } from "react-router-dom";
import { getStoryName, getStoryNameFromSplat } from "../pathUtils";

export type StoryProps = {
    stories: string[];
};

export const Story = ({ stories }: StoryProps) => {
    const { "*": splat } = useParams();

    if (!splat) {
        return null;
    }

    const storyName = getStoryNameFromSplat(splat);

    const story = stories.find((value) => getStoryName(value) === storyName);

    if (!story) {
        return null;
    }

    return <iframe src={`/__nanostory_iframe?storyPath=${encodeURIComponent(story)}`} />;
};

import { useParams } from "react-router-dom";
import { NanostoryConfig } from "../lib";

export const Story = ({ stories }: NanostoryConfig) => {
    const { "*": splat } = useParams();

    if (!splat) {
        return null;
    }

    const story = Object.entries(stories).find(([storyPath]) => splat === storyPath);

    if (!story) {
        return null;
    }

    return <iframe src={`/${story[1]}`} />;
};

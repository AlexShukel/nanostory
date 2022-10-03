export const getStoryName = (storyPath: string) => {
    return storyPath.slice(storyPath.lastIndexOf("/") + 1, storyPath.lastIndexOf(".stories"));
};

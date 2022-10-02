export const getStoryName = (storyPath: string) => {
    return storyPath.slice(storyPath.lastIndexOf("/") + 1, storyPath.lastIndexOf(".stories"));
};

export const getStoryNameFromSplat = (splat: string) => {
    return splat.split("/").at(-1);
};

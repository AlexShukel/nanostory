import { createStory } from "@nanostory/react";
import { Button } from "./Button";

const Default = createStory(Button, {
    onClick: () => {
        console.log("hello");
    },
});

export default Default;

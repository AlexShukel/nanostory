import { createStory } from "@nanostory/react";
import { Button } from "./Button";

export default createStory(Button, {});

export const DisabledButton = createStory(Button, { disabled: true });

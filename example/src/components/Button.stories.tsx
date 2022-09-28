import { createStory } from "@nanostory/react";
import { Button } from "./Button";

const DefaultButton = createStory(Button, {});

export const DisabledButton = createStory(Button, { disabled: true });

export default DefaultButton;

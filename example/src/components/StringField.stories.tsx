import { createStory } from "@nanostory/react";
import { StringField } from "./StringField";

const DefaultStringField = createStory(StringField, {});

export const DisabledStringField = createStory(StringField, { disabled: true });

export const StringFieldWithValidation = createStory(StringField, { minLength: 3, maxLength: 6 });

export default DefaultStringField;

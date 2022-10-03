import { ChangeEvent, useCallback, useState, FocusEvent } from "react";

export type StringFieldProps = {
    disabled?: boolean;
    minLength?: number;
    maxLength?: number;
};

export const StringField = ({ disabled, maxLength, minLength }: StringFieldProps) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }, []);

    const handleBlur = useCallback(() => {
        if (maxLength !== undefined && value.length > maxLength) {
            setError(`Max length is ${maxLength}!`);
            return;
        }

        if (minLength !== undefined && value.length < minLength) {
            setError(`Min length is ${minLength}!`);
            return;
        }

        setError("");
    }, []);

    return (
        <div>
            <input disabled={disabled} value={value} onChange={handleChange} onBlur={handleBlur} />
            {error && <span style={{ color: "red" }}>{error}</span>}
        </div>
    );
};

import { MouseEvent, PropsWithChildren } from "react";

export type ButtonProps = PropsWithChildren<{
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
}>;

export const Button = (props: ButtonProps) => {
    return <button {...props} />;
};

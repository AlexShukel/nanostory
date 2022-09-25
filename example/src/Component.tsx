export type ComponentProps = {
    message: string;
};

export const Component = ({ message }: ComponentProps) => {
    return <p>{message}</p>;
};

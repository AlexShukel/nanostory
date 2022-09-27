export type ComponentProps = {
    message: string;
};

export const Component = ({ message }: ComponentProps) => {
    return <p style={{ fontSize: 36 }}>{message}</p>;
};

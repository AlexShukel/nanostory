export type TextInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const TextInput = (props: TextInputProps) => {
    return <input {...props} />;
};

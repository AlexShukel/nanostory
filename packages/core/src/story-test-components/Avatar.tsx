export type AvatarProps = {
    image: string;
    alt?: string;
};

export const Avatar = ({ image, alt }: AvatarProps) => {
    return <img src={image} alt={alt} />;
};

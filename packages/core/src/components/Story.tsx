import { useParams } from "react-router-dom";

export const Story = () => {
    const params = useParams();

    return <iframe src={encodeURI("./" + params["*"])} />;
};

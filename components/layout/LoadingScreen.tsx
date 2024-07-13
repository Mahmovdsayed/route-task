import { DNA, FallingLines } from "react-loader-spinner";

interface IProps {

}
const LoadingScreen = ({ }: IProps) => {
    return <>
        <div className="flex items-center justify-center h-screen">
            <FallingLines
                color="#181818"
                width="100"
                visible={true}
            />
        </div>
    </>;
};

export default LoadingScreen;
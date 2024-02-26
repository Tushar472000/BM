import FadeLoader from "react-spinners/FadeLoader";

export default function Spinner() {
    return (
        <div className="h-screen -mt-12 w-full relative flex flex-col justify-center items-center px-5 text-sm">
            <FadeLoader
                color="#303030"
                cssOverride={{}}
                height={25}
                margin={22}
                radius={100}
                speedMultiplier={1}
                width={25}
            />
        </div>
    )
}
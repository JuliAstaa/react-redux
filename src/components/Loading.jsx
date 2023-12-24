import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="flex items-center justify-center gap-4">
        <AiOutlineLoading3Quarters className="text-4xl animate-spin" />
        <p>Loading</p>
      </div>
    </div>
  );
};

export default Loading;

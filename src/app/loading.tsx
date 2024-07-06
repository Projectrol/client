import BeatLoader from "react-spinners/BeatLoader";
import loadingGif from "/public/gif/loading.gif";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="container absolute w-full h-full top-0 left-0 flex items-center justify-center">
      <Image alt="loading-gif" src={loadingGif.src} width={200} height={200} />
    </div>
  );
};

export default Loading;

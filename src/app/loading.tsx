import BeatLoader from "react-spinners/BeatLoader";
import loadingGif from "/public/gif/loading.gif";
import Image from "next/image";

const Loading = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image alt="loading-gif" src={loadingGif.src} width={200} height={200} />
    </div>
  );
};

export default Loading;

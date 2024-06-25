import treeGif from "/public/gif/tree.gif";

export default function Test() {
  return (
    <div className="w-full h-full absolute top-0 left-0">
      <img
        src={treeGif.src}
        style={{
          aspectRatio: 16 / 9,
          width: "100%",
        }}
        alt="123"
      />
      ;
    </div>
  );
}

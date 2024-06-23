import CloseIcon from "@mui/icons-material/Close";

const Modal = ({
  children,
  isOpen,
  okTitle = "Accept",
  onOk,
  cancelTitle = "Cancel",
  close,
  showFooter = true,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  okTitle?: string;
  onOk?: () => void;
  cancelTitle?: string;
  close: () => void;
  showFooter?: boolean;
}) => {
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      style={{
        transform: isOpen ? "scale(1)" : "scale(0)",
      }}
      className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] z-[1000] flex items-center justify-center"
    >
      <div
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "scale(1)" : "scale(0)",
          transition: "transform 0.1s ease-in-out, opacity 0.2s ease-in-out",
        }}
        className="bg-[--modal-bg] flex flex-col rounded-md overflow-x-hidden overflow-y-hidden shadow-xl border-solid border-[2px] border-[--border-color]"
      >
        <div className="w-full flex items-center justify-end p-[10px]">
          <button
            onClick={close}
            className="w-[30px] rounded-md aspect-square text-[1.2rem] text-[--base] hover:bg-[--hover-bg]"
          >
            <CloseIcon fontSize="inherit" color="inherit" />
          </button>
        </div>
        <div className="w-full flex-1 overflow-y-auto">
          {isOpen && children}
        </div>
        {showFooter && (
          <div
            className="w-full h-[50px] border-t-solid border-t-[1px] border-t-[--border-color] 
        flex flex-row items-center justify-end px-[15px] gap-[15px]"
          >
            <button
              onClick={close}
              className="bg-[--btn-cancel-bg] text-[--btn-cancel-color] text-[0.82rem] px-[15px] py-[5px] rounded-md"
            >
              {cancelTitle}
            </button>
            <button
              onClick={onOk}
              className="bg-[--btn-ok-bg] text-[--btn-ok-color] text-[0.82rem] px-[15px] py-[5px] rounded-md"
            >
              {okTitle}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

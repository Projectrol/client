const MainBodyHeader = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className="w-full border-b-solid border-b-[1px] flex flex-row items-center
                      text-[0.8rem] font-semibold text-[--base] opacity-75
                      border-b-[--border-color] px-[30px] py-[8px]"
    >
      <span className="max-w-[150px] whitespace-nowrap overflow-hidden overflow-ellipsis">
        {title}
      </span>
      {children}
    </div>
  );
};

export default MainBodyHeader;

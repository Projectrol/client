import React from "react";

const MainBodyHeader = ({
  title,
  style,
  topLeftElement,
  bottomLeftElement,
  topRightElement,
  bottomRightElement,
  leftStyle,
  rightStyle,
}: {
  title?: string;
  style?: React.CSSProperties;
  topLeftElement?: React.ReactNode;
  bottomLeftElement?: React.ReactNode;
  topRightElement?: React.ReactNode;
  bottomRightElement?: React.ReactNode;
  leftStyle?: React.CSSProperties;
  rightStyle?: React.CSSProperties;
}) => {
  return (
    <div
      style={style}
      className="w-full border-b-solid border-b-[1px] flex flex-row items-center
                      text-[1.2rem] font-semibold text-[--base]
                      border-b-[--border-color] px-[30px]"
    >
      <div style={leftStyle} className="flex flex-col">
        <div className="w-full flex flex-row">
          {title && (
            <div className="max-w-[150px] whitespace-nowrap overflow-hidden overflow-ellipsis">
              {title}
            </div>
          )}
          {topLeftElement && <div className="flex-1">{topLeftElement}</div>}
        </div>
        {bottomLeftElement && <div className="w-full">{bottomLeftElement}</div>}
      </div>

      <div style={rightStyle} className="flex flex-col">
        <div className="w-full">
          {topRightElement && <div className="w-full">{topRightElement}</div>}
        </div>
        <div className="w-full">
          {bottomRightElement && (
            <div className="w-full">{bottomRightElement}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainBodyHeader;

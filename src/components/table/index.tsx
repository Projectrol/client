"use client";

import FilterListIcon from "@mui/icons-material/FilterList";
import TuneIcon from "@mui/icons-material/Tune";

type Column = {
  headerTitle: string;
  field?: string;
  sortable?: boolean;
  width: number;
  customRender?: (item: any) => React.ReactNode;
};

function Table({
  data,
  columns,
  loading,
  showToolbar = true,
}: {
  data: any[];
  columns: Column[];
  loading: boolean;
  showToolbar?: boolean;
}) {
  const totalColumnsWidth = columns.reduce(
    (currTotal, currVal) => currTotal + currVal.width,
    0,
  );

  const getFieldValue = (item: any, field: string) => {
    return item[field].toString();
  };

  return (
    <div className="flex w-full flex-col">
      {showToolbar && (
        <div className="border-b-solid flex w-full items-center justify-between border-b-[1px] border-b-[--border-color] px-[20px] py-[8px]">
          <button className="flex select-none items-center gap-[5px] rounded-md px-[8px] py-[3px] text-[0.8rem] font-medium text-[--base] hover:bg-[--hover-bg]">
            <FilterListIcon
              htmlColor="var(--base)"
              style={{ fontSize: "1.25rem" }}
            />
            Filter
          </button>
          <button className="flex select-none items-center gap-[5px] rounded-md border-[1px] border-solid border-[--border-color] bg-[--primary] px-[8px] py-[3px] text-[0.8rem] font-medium text-[--base] shadow-sm hover:bg-[--hover-bg]">
            <TuneIcon htmlColor="var(--base)" style={{ fontSize: "1.1rem" }} />
            Display
          </button>
        </div>
      )}

      <div className="border-b-solid flex w-full items-center justify-between border-b-[1px] border-b-[--border-color] px-[20px] py-[8px]">
        <div className="flex w-full items-center px-[8px] py-[1px] text-[0.825rem] text-[--text-header-color]">
          {columns.map((col, colIndex) => (
            <div
              style={{
                width: `${(col.width / totalColumnsWidth) * 100}%`,
              }}
              key={col.field + "_" + colIndex}
            >
              {col.headerTitle}
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col">
        {data.map((item, i) => (
          <div
            className="border-b-solid flex w-full items-center justify-between gap-[5px] border-b-[1px] border-b-[--border-color] px-[28px] py-[15px] hover:bg-[--hover-bg]"
            key={i}
          >
            {columns.map((col, colIndex) => (
              <div
                key={col.field + "_" + colIndex}
                style={{
                  width: `${(col.width / totalColumnsWidth) * 100}%`,
                  overflowX: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
                className="text-[0.8rem] text-[--base]"
              >
                {col.customRender
                  ? col.customRender(item)
                  : col.field
                    ? getFieldValue(item, col.field)
                    : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Table;

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
}: {
  data: any[];
  columns: Column[];
  loading: boolean;
}) {
  const totalColumnsWidth = columns.reduce(
    (currTotal, currVal) => currTotal + currVal.width,
    0
  );

  const getFieldValue = (item: any, field: string) => {
    return item[field].toString();
  };

  return (
    <div className="w-full flex flex-col">
      <div
        className="w-full flex items-center justify-between px-[20px] py-[8px]
                    border-b-solid border-b-[1px] border-b-[--border-color]"
      >
        <button
          className="flex items-center text-[0.8rem] text-[--base] font-medium gap-[5px] 
                    px-[8px] py-[3px] hover:bg-[--hover-bg] rounded-md select-none"
        >
          <FilterListIcon
            htmlColor="var(--base)"
            style={{ fontSize: "1.25rem" }}
          />
          Filter
        </button>
        <button
          className="flex items-center text-[0.8rem] text-[--base] font-medium gap-[5px] 
                    border-solid border-[1px] border-[--border-color] select-none
                    px-[8px] py-[3px] hover:bg-[--hover-bg] rounded-md bg-[--primary] shadow-sm"
        >
          <TuneIcon htmlColor="var(--base)" style={{ fontSize: "1.1rem" }} />
          Display
        </button>
      </div>

      <div
        className="w-full flex items-center justify-between px-[20px] py-[8px]
                    border-b-solid border-b-[1px] border-b-[--border-color]"
      >
        <div className="w-full flex items-center text-[0.77rem] text-[--text-header-color] px-[8px] py-[1px]">
          {columns.map((col) => (
            <div
              style={{
                width: `${(col.width / totalColumnsWidth) * 100}%`,
              }}
              key={col.field}
            >
              {col.headerTitle}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col">
        {data.map((item, i) => (
          <div
            className="w-full flex items-center justify-between px-[28px] py-[15px] gap-[5px]
                    border-b-solid border-b-[1px] border-b-[--border-color] hover:bg-[--hover-bg]"
            key={i}
          >
            {columns.map((col) => (
              <div
                key={col.field}
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

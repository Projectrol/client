"use client";

import { useHotkeys } from "react-hotkeys-hook";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import clsx from "clsx";
import { FormEvent, useEffect, useRef, useState } from "react";
import { hotKeys } from "@/configs/hot-keys";
import { Project } from "@/services/api/projects-service";

export default function SearchBar() {
  useHotkeys(hotKeys.OPEN_SEARCH, (e: KeyboardEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState(false);
  const [q, setQ] = useState("");
  const timeout = useRef<any>(null);
  const [result, setResult] = useState<{
    projects: Project[];
    cards: any[];
  } | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    alert(q);
  };

  useEffect(() => {
    const search = async () => {
      // const result = await db.search.search(q);
      // setResult(result);
    };
    setResult(null);
    if (timeout.current) {
      setResult(null);
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      if (q.trim().length > 0) {
        search();
      }
    }, 1000);
  }, [q]);

  return (
    <div
      className={clsx({
        "w-full flex flex-col relative z-[600] py-[8px] px-[12px] rounded-t-lg":
          true,
        "border-solid border-[--border-color] border-x-[1px] bg-[--primary] shadow-2xl":
          focus,
      })}
    >
      <form onSubmit={submit} className="relative overflow-hidden">
        <div>
          <SearchOutlinedIcon
            fontSize="inherit"
            color="inherit"
            style={{
              fontSize: "1.25rem",
              position: "absolute",
              top: "calc(100% - 5px)",
              transform: "translate(10px,-100%)",
              transition: "opacity 0.25s ease",
              opacity: focus ? 0 : 1,
              color: "#ffffff",
            }}
          />

          <input
            ref={inputRef}
            style={{
              paddingLeft: focus ? "10px" : "35px",
              transition: "padding-left 0.2s ease",
              background: focus ? "#ffffff" : "#484c64",
              color: focus ? "var(--base)" : "var(--primary)",
            }}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            placeholder="Search"
            className="w-full h-[30px] outline-none rounded-md border-solid font-normal 
                placeholder:text-[--primary] border-[1px] border-[--border-color] pr-[15px] 
                 text-[0.825rem] shadow-sm
                 focus:border-[2px] focus:border-[--btn-ok-bg]"
          />
        </div>
      </form>
      {focus && (
        <div
          style={{
            width: "calc(100% + 1.5px)",
            height: "500px",
          }}
          className="bg-[--primary] absolute top-[39px] -left-[0.1%] shadow-md rounded-b-lg overflow-x-hidden
                border-solid border-[--border-color] border-b-[1px] border-x-[1px]"
        >
          {result && result.projects.length > 0 && (
            <div className="w-full flex flex-col">
              <div className="w-full text-[--base] px-[20px] mt-[15px] text-[0.825rem] mb-[5px] font-semibold select-none">
                Projects
              </div>
              {result.projects.map((p) => (
                <div
                  key={p.id}
                  className="w-full h-[50px] flex items-center text-[--base] cursor-pointer border-solid border-transparent
                           text-[0.8rem] px-[20px] select-none hover:bg-[--hover-bg] border-l-[4px] hover:border-l-[--btn-ok-bg]"
                >
                  {p.name}
                </div>
              ))}
            </div>
          )}
          {result && result.cards.length > 0 && (
            <div className="w-full flex flex-col">
              <div className="w-full text-[--base] px-[20px] mt-[15px] text-[0.825rem] mb-[5px] font-semibold select-none">
                Cards
              </div>
              {result.cards.map((c) => (
                <div
                  key={c.id}
                  className="w-full h-[40px] flex items-center text-[--base] cursor-pointer border-solid border-transparent
                           text-[0.8rem] px-[20px] select-none hover:bg-[--hover-bg] border-l-[4px] hover:border-l-[--btn-ok-bg]"
                >
                  {c.title}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import Loading from "@/app/loading";
import Tabs, { Tab } from "@/components/tabs";
import { State } from "@/services/redux/store";
import useProjects from "@/services/rquery/queries/useProjects";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function SearchToolbarModal() {
  const searchTimeoutRef = useRef<any>(null);
  const [searchInput, setSearchInput] = useState("");
  const [q, setQ] = useState("");
  const tabBtnClass = "px-3 pb-1 text-[--base] text-[0.825rem]";
  const [selectedTabKey, setSelectedTabKey] = useState("ALL");
  const workspaceSlice = useSelector((state: State) => state.workspace);
  const { projects, isLoadingProjects } = useProjects(
    workspaceSlice.workspace,
    q !== "" ? q : "*",
    selectedTabKey === "PROJECTS",
  );
  const tabItems: Tab[] = [
    {
      element: (
        <button
          className={tabBtnClass}
          onClick={() => setSelectedTabKey("ALL")}
        >
          All
        </button>
      ),
      key: "ALL",
    },
    {
      element: (
        <button
          className={tabBtnClass}
          onClick={() => setSelectedTabKey("PROJECTS")}
        >
          Projects
        </button>
      ),
      key: "PROJECTS",
    },
    {
      element: (
        <button
          className={tabBtnClass}
          onClick={() => setSelectedTabKey("TASKS")}
        >
          Tasks
        </button>
      ),
      key: "TASKS",
    },
    {
      element: (
        <button
          className={tabBtnClass}
          onClick={() => setSelectedTabKey("DOCUMENTS")}
        >
          Documents
        </button>
      ),
      key: "DOCUMENTS",
    },
    {
      element: (
        <button
          className={tabBtnClass}
          onClick={() => setSelectedTabKey("USERS")}
        >
          Users
        </button>
      ),
      key: "USERS",
    },
  ];

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      setQ(searchInput);
    }, 250);
  }, [searchInput]);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="w-full px-5 py-3">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          placeholder="Search"
          className="w-full rounded-md border border-[--border-color] bg-[--primary] px-3 py-2 focus:bg-[--secondary]"
        />
      </div>
      <div className="w-full border-b-[1px] border-solid border-[--border-color] px-5">
        <Tabs items={tabItems} selectedKey={selectedTabKey} />
      </div>
      <div className="w-full px-5 pt-3">
        {selectedTabKey === "PROJECTS" &&
          (isLoadingProjects ? (
            <Loading />
          ) : ( 
            projects.map((p) => <div key={p.id}>{p.name}</div>)
          ))}
      </div>
    </div>
  );
}

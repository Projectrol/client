"use client";

import MainBodyHeader from "@/components/layouts/main-layout/components/main-body-header";
import useRouteInfo from "@/hooks/useRouteInfo";

const Teams = () => {
  const { title } = useRouteInfo();
  return (
    <div className="w-full flex flex-col">
      <MainBodyHeader title={title}>
        <div className="flex-1 flex flex-row items-center ml-[10px]">123</div>
      </MainBodyHeader>
    </div>
  );
};

export default Teams;

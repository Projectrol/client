"use client";

import MainBodyHeader from "@/components/layouts/main-layout/components/main-body-header";
import useRouteInfo from "@/hooks/useRouteInfo";

const Teams = () => {
  const { title } = useRouteInfo();
  return (
    <div className="w-full flex flex-col">
      <MainBodyHeader title={title} leftStyle={{ padding: "15px 0" }} />
    </div>
  );
};

export default Teams;

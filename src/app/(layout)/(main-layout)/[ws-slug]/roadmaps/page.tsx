"use client";

import MainBodyHeader from "@/components/layouts/main-layout/components/main-body-header";
import useRouteInfo from "@/hooks/useRouteInfo";

const Roadmaps = () => {
  const { title } = useRouteInfo();
  return (
    <div className="w-full flex flex-col">
      <MainBodyHeader title={title}></MainBodyHeader>
    </div>
  );
};

export default Roadmaps;

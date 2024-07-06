"use client";

import MainBodyHeader from "@/components/layouts/main-layout/components/main-body-header";
import useRouteInfo from "@/hooks/useRouteInfo";

const MyIssues = () => {
  const { title } = useRouteInfo();
  return <div className="w-full flex flex-col"></div>;
};

export default MyIssues;

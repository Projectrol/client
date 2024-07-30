import { Metadata } from "next";
import ProjectOverviewView from "./view";
import ProjectDocuments from "./view";

export const generateMetadata = ({
  params,
}: {
  params: { slug: string };
}): Metadata => {
  const projectName = params.slug
    .split("-")
    .reduce(
      (currStr, currVal, i, arr) =>
        i < arr.length - 1 ? currStr + `${currVal} ` : currStr,
      ""
    );
  return {
    title: "Documents: " + projectName,
  };
};

export default function ProjectOverview({
  params,
}: {
  params: { slug: string };
}) {
  return <ProjectDocuments />;
}

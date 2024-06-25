import { Metadata } from "next";
import ProjectBoardView from "./view";

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
    title: "Board: " + projectName,
  };
};

export default function ProjectBoard({ params }: { params: { slug: string } }) {
  return <ProjectBoardView slug={params.slug} />;
}

import { Metadata } from "next";
import ProjectView from "./view";

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
    title: projectName,
  };
};

export default function Project({ params }: { params: { slug: string } }) {
  return <ProjectView slug={params.slug} />;
}

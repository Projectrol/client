export type Workspace = {
  id: number;
  name: string;
  logo: string;
  slug: string;
};

export const workspaces: Workspace[] = [
  {
    id: 0,
    name: "Uber",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Uber_App_Icon.svg/2048px-Uber_App_Icon.svg.png",
    slug: "uber",
  },
];

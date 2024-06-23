const defaultAvatar =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwdIVSqaMsmZyDbr9mDPk06Nss404fosHjLg&s";

const defaultAvatar2 =
  "https://st2.depositphotos.com/9998432/48297/v/380/depositphotos_482974552-stock-illustration-default-avatar-photo-placeholder-grey.jpg";

export enum ProjectRole {
  LEAD = "LEAD",
  MEMBER = "MEMBER",
  PM = "PM",
}

export type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  avatar?: string;
};

export const users: User[] = [
  {
    id: 0,
    username: "lehoangvuvt",
    email: "hoangvule100@gmail.com",
    name: "Lê Hoàng Vũ",
    avatar: defaultAvatar,
  },
  {
    id: 1,
    username: "tranminhnghia",
    email: "minhnghiatran@gmail.com",
    name: "Trần Minh Nghĩa",
    avatar: defaultAvatar,
  },
  {
    id: 2,
    username: "nguyenthaitoan",
    email: "nguyenthaitoan1001@gmail.com",
    name: "Nguyễn Thái Toàn",
    avatar: defaultAvatar,
  },
  {
    id: 3,
    username: "huongthu990",
    email: "huongthu990@gmail.com",
    name: "Hoàng Thu Hương",
    avatar: defaultAvatar2,
  },
  {
    id: 4,
    username: "anhnguyet551",
    email: "anhnguyet551@gmail.com",
    name: "Trương Thị Nguyệt Ánh",
    avatar: defaultAvatar2,
  },
];

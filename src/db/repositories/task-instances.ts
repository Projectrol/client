import { TaskEntity } from "./task-entities.repo";

export type TaskInstance = {
  nanoid: string;
  taskEntityId: number;
  dtstart: Date; //Datetime;
  createdAt: Date;
  updatedAt: Date | null;
};

export type TaskInstanceWithEntity = {
  nanoid: string;
  taskEntity: TaskEntity;
  dtstart: Date;
};

export type CreateTaskInstanceInput = {
  taskEntityId: number;
  dtstart: Date; //Datetime;
};

export const taskInstances: TaskInstance[] = [
  // {
  //   nanoid: "bDSE9_uAL_",
  //   createdAt: new Date("2024-06-27T06:24:10.090Z"),
  //   updatedAt: null,
  //   dtstart: new Date("2024-06-27T06:24:10.062Z"),
  //   taskEntityId: 0,
  // },
  // {
  //   nanoid: "IwcLH3RTz5",
  //   createdAt: new Date("2024-06-27T06:24:10.090Z"),
  //   updatedAt: null,
  //   dtstart: new Date("2024-07-11T06:24:10.062Z"),
  //   taskEntityId: 0,
  // },
  // {
  //   nanoid: "giAJMlrGll",
  //   createdAt: new Date("2024-06-27T06:24:10.090Z"),
  //   updatedAt: null,
  //   dtstart: new Date("2024-07-25T06:24:10.062Z"),
  //   taskEntityId: 0,
  // },
  // {
  //   nanoid: "YY4W-hmPVf",
  //   createdAt: new Date("2024-06-27T06:24:10.090Z"),
  //   updatedAt: null,
  //   dtstart: new Date("2024-08-08T06:24:10.062Z"),
  //   taskEntityId: 0,
  // },
  // {
  //   nanoid: "A_G0c13UIB",
  //   createdAt: new Date("2024-06-27T06:24:10.090Z"),
  //   updatedAt: null,
  //   dtstart: new Date("2024-08-22T06:24:10.062Z"),
  //   taskEntityId: 0,
  // },
];

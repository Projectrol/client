export enum RecurringType {
  MINUTELY = "MINUTELY",
  HOURLY = "HOURLY",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}

export type ByWeekDayRule = {
  day: number;
  every: number; //-1 last, 1 first, others normal
};

export type RecurringConfig = {
  type: RecurringType;
  count: number; //number of instances created, -1 is infitite (it meaans will create 200 instance)
  interval: number; //every
  untilDate?: Date; //Date
  byweekdayRule?: ByWeekDayRule;
};

export type CreateTaskInput = {
  title: string;
  description: string;
  duration: number;
  dtstart: Date; //datetime;
  recurring?: RecurringConfig;
};

export type TaskEntity = {
  id: number;
  title: string;
  description: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date | null;
};

export const taskEntities: TaskEntity[] = [
  // {
  //   createdAt: new Date("2024-06-27T06:24:10.063Z"),
  //   updatedAt: null,
  //   description: "Test",
  //   title: "Test",
  //   duration: 3600,
  //   id: 0,
  // },
];

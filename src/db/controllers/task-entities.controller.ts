import moment from "moment";
import { db } from "..";
import {
  CreateTaskInput,
  RecurringType,
  TaskEntity,
  taskEntities,
} from "../repositories/task-entities.repo";
import {
  CreateTaskInstanceInput,
  TaskInstance,
} from "../repositories/task-instances";
import { getDateOfNthDay } from "@/lib/datetime";

export const TaskEntitiesController = {
  async create(input: CreateTaskInput): Promise<TaskEntity> {
    const { description, duration, recurring, title, dtstart } = input;
    const newTaskEntity: TaskEntity = {
      createdAt: new Date(),
      updatedAt: null,
      description,
      title,
      duration,
      id: taskEntities.length,
    };
    taskEntities.push(newTaskEntity);

    await new Promise((resolve, _) => setTimeout(() => resolve(true), 25));

    if (!recurring) {
      db.taskInstances.create({
        dtstart,
        taskEntityId: newTaskEntity.id,
      });

      return newTaskEntity;
    }
    const instanceInputs = this.processRecurring(input, newTaskEntity.id);
    db.taskInstances.createBulk(instanceInputs);
    return newTaskEntity;
  },
  getById(id: number): TaskEntity | null {
    return taskEntities.find((t) => t.id === id) ?? null;
  },
  processRecurring(
    input: CreateTaskInput,
    entityId: number
  ): CreateTaskInstanceInput[] {
    const { recurring, dtstart } = input;
    if (!recurring) return [];
    const startDT = moment(dtstart);
    const { interval, byweekdayRule, count, type } = recurring;
    let currentDT = startDT;
    let intervalType: moment.unitOfTime.DurationConstructor = "hours";
    switch (type) {
      case RecurringType.DAILY:
        intervalType = "days";
        break;
      case RecurringType.WEEKLY:
        intervalType = "weeks";
        break;
      case RecurringType.MONTHLY:
        intervalType = "months";
        break;
      case RecurringType.YEARLY:
        intervalType = "years";
        break;
    }
    const instanceInputs: CreateTaskInstanceInput[] = [];
    if (type !== RecurringType.WEEKLY && byweekdayRule) {
      instanceInputs.push({
        dtstart,
        taskEntityId: entityId,
      });
      if (type === RecurringType.MONTHLY) {
        let month = dtstart.getMonth() + interval;
        for (let i = 0; i < count; i++) {
          const foundedDate = getDateOfNthDay(
            dtstart.getFullYear(),
            month,
            byweekdayRule.day,
            byweekdayRule.every
          );
          foundedDate.setHours(dtstart.getHours());
          foundedDate.setMinutes(dtstart.getMinutes());
          instanceInputs.push({
            dtstart: structuredClone(foundedDate),
            taskEntityId: entityId,
          });
          month = month + interval;
        }
      } else {
      }
    } else {
      for (let i = 0; i < count; i++) {
        instanceInputs.push({
          dtstart: new Date(currentDT.toISOString()),
          taskEntityId: entityId,
        });
        currentDT = currentDT.add(interval, intervalType);
      }
    }

    return instanceInputs;
  },
};

import { nanoid } from "nanoid";
import {
  CreateTaskInstanceInput,
  TaskInstance,
  TaskInstanceWithEntity,
  taskInstances,
} from "../repositories/task-instances";
import { db } from "..";

export const TaskInstancesControllers = {
  create(input: CreateTaskInstanceInput): TaskInstance {
    const { dtstart, taskEntityId } = input;
    const newTaskInsance: TaskInstance = {
      nanoid: nanoid(10),
      createdAt: new Date(),
      updatedAt: null,
      dtstart,
      taskEntityId,
    };
    taskInstances.push(newTaskInsance);
    return newTaskInsance;
  },
  async createBulk(
    inputs: CreateTaskInstanceInput[]
  ): Promise<{ success: TaskInstance[]; error: TaskInstance[] }> {
    const result: { success: TaskInstance[]; error: TaskInstance[] } = {
      success: [],
      error: [],
    };

    await Promise.all(
      inputs.map(async (input) => {
        const { dtstart, taskEntityId } = input;
        const newTaskInsance: TaskInstance = {
          nanoid: nanoid(10),
          createdAt: new Date(),
          updatedAt: null,
          dtstart,
          taskEntityId,
        };
        taskInstances.push(newTaskInsance);
        result.success.push(newTaskInsance);
        await new Promise((resolve, _) => setTimeout(() => resolve(true), 25));
      })
    );

    console.log(taskInstances);
    return result;
  },
  async getByDateRange(
    fromDate: Date,
    toDate: Date
  ): Promise<TaskInstanceWithEntity[]> {
    await new Promise((resolve, _) => setTimeout(() => resolve(true), 25));
    const taskInstancesWithEntity: TaskInstanceWithEntity[] = [];
    taskInstances.forEach((instance) => {
      if (
        instance.dtstart.getTime() >= fromDate.getTime() &&
        instance.dtstart.getTime() <= toDate.getTime()
      ) {
        const taskEntity = db.taskEntities.getById(instance.taskEntityId);
        if (taskEntity) {
          const taskInstanceWithEntity: TaskInstanceWithEntity = {
            dtstart: instance.dtstart,
            nanoid: instance.nanoid,
            taskEntity,
          };
          taskInstancesWithEntity.push(taskInstanceWithEntity);
        }
      }
    });
    return taskInstancesWithEntity;
  },
};

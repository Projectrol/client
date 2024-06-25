import { customAlphabet } from "nanoid";
import {
  projects,
  Project,
  CreateProjectInput,
} from "../repositories/projects.repo";

export const ProjectsController = {
  async getAllProjects(): Promise<Project[]> {
    await new Promise((resolve, _) => setTimeout(() => resolve(true), 0));
    return projects;
  },
  create(input: CreateProjectInput): Project | null {
    let id = 0;
    if (projects.length > 0) {
      id = projects[projects.length - 1].id + 1;
    }
    const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwhyz", 12);
    const slug = `${input.name.replaceAll(" ", "-").toLowerCase()}-${nanoid()}`;
    const project = {
      ...input,
      slug,
      id,
      createdAt: new Date(),
      updatedAt: null,
    };
    console.log(project);
    projects.push(project);
    return projects.find((p) => p.id === id) ?? null;
  },
  async getBySlug(slug: string): Promise<Project | null> {
    await new Promise((resolve, _) => setTimeout(() => resolve(true), 500));
    return projects.find((p) => p.slug === slug) ?? null;
  },
  async updateProjectDate(
    id: number,
    startDate: Date,
    targetDate: Date
  ): Promise<Project | null> {
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) return null;
    projects[index].startDate = startDate;
    projects[index].targetDate = targetDate;
    await new Promise((resolve, _) => setTimeout(() => resolve(true), 100));
    return projects[index];
  },
};

export enum ProjectStatus {
  BACKLOG = "Backlog",
  PLANNED = "Planned",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
  CANCELED = "Canceled",
}

export type Project = {
  id: number;
  slug: string;
  startDate: Date;
  targetDate: Date;
  name: string;
  summary: string;
  description: string;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date | null;
};

export type CreateProjectInput = {
  startDate: Date;
  targetDate: Date;
  name: string;
  summary: string;
  description: string;
  status: ProjectStatus;
};

export const projects: Project[] = [
  {
    name: "Tracking driver's behaviors service",
    summary: "Tracking driver's behaviors and analyze data to make reports.",
    slug: "tracking-driver-behaviors-service-c5548e297b6d",
    description:
      '{"1ea94cd3-2367-48de-8bd9-8e3cc24aaa7c":{"id":"1ea94cd3-2367-48de-8bd9-8e3cc24aaa7c","value":[{"id":"bcd2688d-dd97-486d-a3a3-7b763c1be3cd","type":"heading-one","props":{"nodeType":"block"},"children":[{"text":"Introduction:"}]}],"type":"HeadingOne","meta":{"order":0,"depth":0}},"e0eff9b2-317d-4321-976f-4a606b2b5702":{"id":"e0eff9b2-317d-4321-976f-4a606b2b5702","value":[{"id":"50b6ece5-b486-4497-baa2-481c3f6e1555","type":"accordion-list","children":[{"id":"6019081c-ceb1-4cec-ab8e-9506d45ee0a9","type":"accordion-list-item","children":[{"id":"f7f2eb38-5e03-4589-b212-abbf411754c5","type":"accordion-list-item-heading","children":[{"text":"This is something we need to considered before doing anything after."}],"props":{"nodeType":"block"}},{"id":"3bcbf20b-c345-40f5-93a5-48e371d3171d","type":"accordion-list-item-content","children":[{"text":""}],"props":{"nodeType":"block"}}],"props":{"nodeType":"block","isExpanded":false}}]}],"type":"Accordion","meta":{"order":1,"depth":0}},"737f1f2b-c253-49db-81e3-32c9a4b689a5":{"id":"737f1f2b-c253-49db-81e3-32c9a4b689a5","value":[{"id":"be106619-38d8-4cb7-9e89-7d509d49887a","type":"blockquote","children":[{"text":"Some quote"}]}],"type":"Blockquote","meta":{"order":2,"depth":0}}}',
    startDate: new Date("2024-06-03T17:00:00.000Z"),
    targetDate: new Date("2024-12-13T17:00:00.000Z"),
    status: ProjectStatus.IN_PROGRESS,
    id: 0,
    createdAt: new Date("2024-06-22T17:06:07.195Z"),
    updatedAt: null,
  },
  {
    name: "Order food app like shopeefood",
    summary: "Food ordering mobile & web apps",
    description:
      '{"1ea94cd3-2367-48de-8bd9-8e3cc24aaa7c":{"id":"1ea94cd3-2367-48de-8bd9-8e3cc24aaa7c","value":[{"id":"bcd2688d-dd97-486d-a3a3-7b763c1be3cd","type":"heading-one","props":{"nodeType":"block"},"children":[{"text":"Introduction:"}]}],"type":"HeadingOne","meta":{"order":0,"depth":0}},"e0eff9b2-317d-4321-976f-4a606b2b5702":{"id":"e0eff9b2-317d-4321-976f-4a606b2b5702","value":[{"id":"50b6ece5-b486-4497-baa2-481c3f6e1555","type":"accordion-list","children":[{"id":"6019081c-ceb1-4cec-ab8e-9506d45ee0a9","type":"accordion-list-item","children":[{"id":"f7f2eb38-5e03-4589-b212-abbf411754c5","type":"accordion-list-item-heading","children":[{"text":"This is something we need to considered before doing anything after."}],"props":{"nodeType":"block"}},{"id":"3bcbf20b-c345-40f5-93a5-48e371d3171d","type":"accordion-list-item-content","children":[{"text":""}],"props":{"nodeType":"block"}}],"props":{"nodeType":"block","isExpanded":false}}]}],"type":"Accordion","meta":{"order":1,"depth":0}},"737f1f2b-c253-49db-81e3-32c9a4b689a5":{"id":"737f1f2b-c253-49db-81e3-32c9a4b689a5","value":[{"id":"be106619-38d8-4cb7-9e89-7d509d49887a","type":"blockquote","children":[{"text":"Some quote"}]}],"type":"Blockquote","meta":{"order":2,"depth":0}}}',
    startDate: new Date("2024-01-31T17:00:00.000Z"),
    targetDate: new Date("2024-11-12T17:00:00.000Z"),
    status: ProjectStatus.BACKLOG,
    slug: "order-food-app-like-shopeefood-l7b67k3z9kul",
    id: 1,
    createdAt: new Date("2024-06-23T07:09:51.993Z"),
    updatedAt: null,
  },
];

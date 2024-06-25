import { CardStatus } from "./projects.repo";

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export type Card = {
  id: number;
  nanoid: string;
  project_id: number;
  slug: string;
  title: string;
  description: string;
  status: CardStatus;
  priority: Priority;
  createdAt: Date;
  updatedAt: Date | null;
};

export type CreateCardInput = {
  project_id: number;
  title: string;
  description: string;
  status: CardStatus;
  priority: Priority;
};

export const cards: Card[] = [
  {
    nanoid: "8m5F8c",
    title: "Setup project structure",
    project_id: 0,
    priority: Priority.URGENT,
    description:
      '{"1ea94cd3-2367-48de-8bd9-8e3cc24aaa7c":{"id":"1ea94cd3-2367-48de-8bd9-8e3cc24aaa7c","value":[{"id":"bcd2688d-dd97-486d-a3a3-7b763c1be3cd","type":"heading-one","props":{"nodeType":"block"},"children":[{"text":"Introduction:"}]}],"type":"HeadingOne","meta":{"order":0,"depth":0}},"e0eff9b2-317d-4321-976f-4a606b2b5702":{"id":"e0eff9b2-317d-4321-976f-4a606b2b5702","value":[{"id":"50b6ece5-b486-4497-baa2-481c3f6e1555","type":"accordion-list","children":[{"id":"6019081c-ceb1-4cec-ab8e-9506d45ee0a9","type":"accordion-list-item","children":[{"id":"f7f2eb38-5e03-4589-b212-abbf411754c5","type":"accordion-list-item-heading","children":[{"text":"This is something we need to considered before doing anything after."}],"props":{"nodeType":"block"}},{"id":"3bcbf20b-c345-40f5-93a5-48e371d3171d","type":"accordion-list-item-content","children":[{"text":""}],"props":{"nodeType":"block"}}],"props":{"nodeType":"block","isExpanded":false}}]}],"type":"Accordion","meta":{"order":1,"depth":0}},"737f1f2b-c253-49db-81e3-32c9a4b689a5":{"id":"737f1f2b-c253-49db-81e3-32c9a4b689a5","value":[{"id":"be106619-38d8-4cb7-9e89-7d509d49887a","type":"blockquote","children":[{"text":"Some quote"}]}],"type":"Blockquote","meta":{"order":2,"depth":0}}}',
    status: CardStatus.IN_PROGRESS,
    id: 0,
    createdAt: new Date("2024-06-22T17:06:07.195Z"),
    updatedAt: null,
    slug: "setup-project-structure",
  },
  {
    nanoid: "popgoN",
    title: "Design database",
    priority: Priority.HIGH,
    project_id: 0,
    description:
      '{"1ea94cd3-2367-48de-8bd9-8e3cc24aaa7c":{"id":"1ea94cd3-2367-48de-8bd9-8e3cc24aaa7c","value":[{"id":"bcd2688d-dd97-486d-a3a3-7b763c1be3cd","type":"heading-one","props":{"nodeType":"block"},"children":[{"text":"Introduction:"}]}],"type":"HeadingOne","meta":{"order":0,"depth":0}},"e0eff9b2-317d-4321-976f-4a606b2b5702":{"id":"e0eff9b2-317d-4321-976f-4a606b2b5702","value":[{"id":"50b6ece5-b486-4497-baa2-481c3f6e1555","type":"accordion-list","children":[{"id":"6019081c-ceb1-4cec-ab8e-9506d45ee0a9","type":"accordion-list-item","children":[{"id":"f7f2eb38-5e03-4589-b212-abbf411754c5","type":"accordion-list-item-heading","children":[{"text":"This is something we need to considered before doing anything after."}],"props":{"nodeType":"block"}},{"id":"3bcbf20b-c345-40f5-93a5-48e371d3171d","type":"accordion-list-item-content","children":[{"text":""}],"props":{"nodeType":"block"}}],"props":{"nodeType":"block","isExpanded":false}}]}],"type":"Accordion","meta":{"order":1,"depth":0}},"737f1f2b-c253-49db-81e3-32c9a4b689a5":{"id":"737f1f2b-c253-49db-81e3-32c9a4b689a5","value":[{"id":"be106619-38d8-4cb7-9e89-7d509d49887a","type":"blockquote","children":[{"text":"Some quote"}]}],"type":"Blockquote","meta":{"order":2,"depth":0}}}',
    status: CardStatus.BACKLOG,
    id: 1,
    createdAt: new Date("2024-06-22T17:06:07.195Z"),
    updatedAt: null,
    slug: "design-database",
  },
];

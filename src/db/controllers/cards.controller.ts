import { customAlphabet } from "nanoid";
import { CardStatus } from "../repositories/projects.repo";
import { Card, CreateCardInput, cards } from "../repositories/cards.repo";
import { db } from "..";

export const CardsController = {
  async getAllCardsByProjectSlug(slug: string): Promise<Card[]> {
    const project = await db.projects.getBySlug(slug);
    if (!project) return [];
    await new Promise((resolve, _) => setTimeout(() => resolve(true), 500));
    return cards.filter((c) => c.project_id === project.id);
  },
  create(input: CreateCardInput): Card | null {
    let id = 0;
    if (cards.length > 0) {
      id = cards[cards.length - 1].id + 1;
    }
    const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwhyz", 8);
    const slug = `${input.title.replaceAll(" ", "-").toLowerCase()}`;
    const card: Card = {
      ...input,
      slug,
      id,
      nanoid: nanoid(),
      createdAt: new Date(),
      updatedAt: null,
    };
    cards.push(card);
    return cards.find((c) => c.id === id) ?? null;
  },
  async getCardByNanoid(nanoid: string): Promise<Card | null> {
    await new Promise((resolve, _) => setTimeout(() => resolve(true), 250));
    return cards.find((c) => c.nanoid === nanoid) ?? null;
  },
  async updateCardStatus(
    nanoid: string,
    newStatus: CardStatus
  ): Promise<boolean> {
    await new Promise((resolve, _) => setTimeout(() => resolve(true), 100));
    const index = cards.findIndex((c) => c.nanoid === nanoid);
    if (index === -1) return false;
    cards[index].status = newStatus;
    return true;
  },
};

import { heroes } from "../data/heros";

export const findHeroByid = (id: number) => {
    return heroes.find((hero) => hero.id === id);
}

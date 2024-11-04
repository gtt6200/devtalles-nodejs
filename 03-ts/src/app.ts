import { findHeroByid } from "./services/hero.service";



const hero = findHeroByid(3);

console.log(hero?.name ?? 'Hero not found');

import { describe, expect, test } from '@jest/globals';
import { getPokemonById } from '../../src/js-foundation/06-promises';


describe('js-foundation/06-promises', () => {
    test('getPokemonById should return a pokemon', async () => {
        const id: number = 1;
        //const name: string = 'charmander';
        const name: string = 'bulbasaur';
        const getPokemon = await getPokemonById(id);
        expect(getPokemon).toBe(name);
    });
    test('should retunr an error if pokemon does not exist', async () => {
        const pokemonId: number = 10000000;
        try {
            await getPokemonById(pokemonId);
        } catch (error) {
            expect(error).toBe(`Pokemon not found ${pokemonId}`);
        }
    });
});
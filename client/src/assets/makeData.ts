import { faker } from '@faker-js/faker';

export type Item = {
    name: string;
    description?: string;
    weight?: number;
    tags?: string[];
    conditions?: string[];
    packed: boolean;
}

const range = (len: number) => {
    const arr = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

export const createNewItem = (): Item => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        weight: faker.number.int({ min: 1, max: 100 }),
        tags: [faker.commerce.productMaterial(), faker.commerce.productMaterial(), faker.commerce.productMaterial()],
        conditions: [faker.commerce.productAdjective(), faker.commerce.productAdjective(), faker.commerce.productAdjective()],
        packed: faker.datatype.boolean(),
    }
}

export function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): Item[] => {
        // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
        const len = lens[depth]!
        return range(len).map((): Item => {
            return createNewItem()
        })
    }

    return makeDataLevel()
}
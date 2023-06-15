import { faker } from '@faker-js/faker';
import { getRangomInt } from '../utils/randomInt';

const generateEventsList = () => {
  const count = getRangomInt(3, 10);
  return Array.from({length: count}, () => {
    return {
      id: faker.datatype.uuid(),
      title: faker.lorem.lines(1),
      text: faker.lorem.lines(2),
      date: faker.date.between('2022-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
    };
  });
}

export { generateEventsList };

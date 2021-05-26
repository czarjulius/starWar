import supertest from 'supertest';
import app from '../server';
import { fetchPeopleQuery } from './query';
import dummyPeople from './dummyPeople.json';
import dummyHomeWorld from './dummyHomeWorld.json';
import SwapiData from '../graphql/resources';


const apolloClient = async ({ ...params } = {}) => await supertest(app).post('/graphql').set('Accept', 'application/json').send(params);

const swapiApiMock = jest.fn(async () => {
  return Promise.resolve(dummyPeople);
});

const getHomeWorldMock = jest.fn(async () => {
  return Promise.resolve(dummyHomeWorld);
});

describe('Swapi Call', () => {

    beforeAll(async () => {
      jest.spyOn(SwapiData.prototype, 'request').mockImplementation(swapiApiMock);
      jest.spyOn(SwapiData.prototype, 'getHomeWorld').mockImplementation(getHomeWorldMock);
    });
    afterAll(async () => {
      jest.restoreAllMocks();
    });
    test('should fetch people successfully', async () => {
      const { statusCode, body: { data: { fetchPeople } } } = await apolloClient({
        query: fetchPeopleQuery,
      });
      expect(statusCode).toBe(200);
      expect(fetchPeople.data).toHaveLength(2);
      expect(fetchPeople).toHaveProperty('page');
      expect(fetchPeople.data[0]).toHaveProperty('home_world');
      expect(fetchPeople.data[0]).toHaveProperty('gender');
      expect(fetchPeople.data[0]).toHaveProperty('height');
      expect(fetchPeople.data[0]).toHaveProperty('mass');
      expect(fetchPeople.data[0]).toHaveProperty('name');
    });
});
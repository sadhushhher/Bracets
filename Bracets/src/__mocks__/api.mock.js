import axios, { AxiosRequestConfig } from 'axios';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MockAdapter from 'axios-mock-adapter';

import { getRangomInt } from '../utils/randomInt';
import { generateEventsList } from './calendar.generator';
import { responseGenerator } from './response.generator';

const isAxioMock = true;
const axiosMockInstance = axios.create();
const axiosLiveInstance = axios.create();
const delayResponse = getRangomInt(1000, 3000);

export const axiosMockAdapterInstance = new MockAdapter(axiosMockInstance, { delayResponse });

axiosMockAdapterInstance.onGet('/api/v1/calendars').reply(200, generateEventsList());

// axiosMockAdapterInstance.reset();
export default isAxioMock ? axiosMockInstance : axiosLiveInstance;

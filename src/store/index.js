import { createStore } from 'vuex';

import coachesModule from './modules/coaches';
import requestsModule from './modules/requests';

const store = createStore({
  state: {},
  modules: {
    coaches: coachesModule,
    requestsModule,
  },
  actions: {},
  getters: {},
});

export default store;

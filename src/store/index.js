import { createStore } from 'vuex';

import coachesModule from './modules/coaches';
import requestsModule from './modules/requests';

const store = createStore({
  state() {
    return {
      userId: 'c3',
    };
  },
  modules: {
    coaches: coachesModule,
    requestsModule,
  },
  actions: {},
  getters: {
    userId: state => state.userId,
  },
});

export default store;

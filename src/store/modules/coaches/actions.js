export default {
  async registerCoach(context, data) {
    const { firstName, lastName, description, rate, areas } = data;

    const { userId, token } = context.rootGetters;
    const coach = {
      firstName,
      lastName,
      description,
      hourlyRate: rate,
      areas,
    };


    const response = await fetch(
      `https://vue-coach-app-c0620-default-rtdb.firebaseio.com/coaches/${ userId }.json?auth=${ token }`,
      {
        method: 'PUT',
        body: JSON.stringify(coach),
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // throw new Error(responseData.error);
    }

    context.commit('registerCoach', {
      ...coach,
      id: userId,
    });
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch('https://vue-coach-app-c0620-default-rtdb.firebaseio.com/coaches.json');
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed loading coaches');
      throw error;
    }

    const coaches = [];

    for (const coachId in responseData) {
      const coach = {
        ...responseData[coachId],
        id: coachId,
      }
      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  }
};

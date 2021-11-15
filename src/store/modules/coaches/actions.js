export default {
  registerCoach(context, data) {
    const { firstName, lastName, description, rate, areas } = data;
    const coach = {
      id: context.rootGetters.userId,
      firstName,
      lastName,
      description,
      hourlyRate: rate,
      areas,
    };
    context.commit('registerCoach', coach);
  },
};

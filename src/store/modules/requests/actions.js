export default {
  contactCoach(context, data) {
    const { coachId, email, message } = data;
    const request = {
      id: new Date().toISOString(),
      coachId,
      userEmail: email,
      message,
    };
    context.commit('addRequest', request);
  },
};

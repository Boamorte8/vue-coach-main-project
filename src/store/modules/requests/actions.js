export default {
  async contactCoach(context, data) {
    const { coachId, email, message } = data;
    const request = {
      coachId,
      userEmail: email,
      message,
    };
    const response = await fetch( `https://vue-coach-app-c0620-default-rtdb.firebaseio.com/requests/${ coachId }.json`, {
      method: 'POST',
      body: JSON.stringify(request),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed sending request');
      throw error;
    }

    request.id = responseData.name;
    request.coachId = coachId;

    context.commit('addRequest', request);
  },
  async loadRequests(context) {
    const userId = context.rootGetters.userId;
    const response = await fetch(`https://vue-coach-app-c0620-default-rtdb.firebaseio.com/requests/${ userId }.json`);
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed loading requests');
      throw error;
    }

    const requests = [];

    for (const requestId in responseData) {
      const request = {
        ...responseData[requestId],
        id: requestId,
        coachId: userId,
      }
      requests.push(request);
    }

    context.commit('setRequests', requests);
  }
};

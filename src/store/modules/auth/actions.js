
function authRequest(process, payload) {
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:${process}?key=AIzaSyC3_cyslUxiQrdiDD4__fARNPLf9v88JXw`,
    {
      method: 'POST',
      body: JSON.stringify({
        ...payload,
        returnSecureToken: true,
      }),
    }
  );
}

async function validateResponse(context, response, customErrorMessage) {
  const responseData = await response.json();

  if (!response.ok) {
    const error = new Error(responseData.message || customErrorMessage);
    throw error;
  }

  context.commit('setUser', {
    token: responseData.idToken,
    userId: responseData.localId,
    tokenExpiration: new Date().getTime() + Number.parseInt(responseData.expiresIn) * 1000,
  });
}

export default {
  async login(context, { email, password }) {
    const response = await authRequest('signInWithPassword', { email, password });

    await validateResponse(context, response, 'Failed login. Check your login data');
  },
  async signup(context, { email, password }) {
    const response = await authRequest('signUp', { email, password });

    await validateResponse(context, response, 'Failed sign up. Check your signup data');
  },
  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
};
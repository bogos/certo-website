import Vue from 'vue';
import * as constants from '@/store/constants';

const state = {
  user: {},
  error: {
    code: null,
    message: null,
  },
};

const actions = {
  [constants.SESSION_SIGN_IN]: ({ commit }, {
    loginEmail,
    loginPassword,
  }) => {
    Vue.firebase.auth()
      .signInWithEmailAndPassword(loginEmail, loginPassword)
      .then(({ user }) => user)
      .then(({
        displayName,
        email,
        emailVerified,
        photoURL,
        uid,
      }) => {
        const user = {
          displayName,
          email,
          emailVerified,
          photoURL,
          uid,
        };
        commit(constants.SESSION_SET_PROPERTY, { user });
        commit(constants.SESSION_SET_PROPERTY, {
          error: {
            code: null,
            message: null,
          },
        });
      })
      .catch((error) => {
        commit(constants.SESSION_SET_PROPERTY, { error });
        commit(constants.SESSION_SET_PROPERTY, { user: null });
      });
  },
  [constants.SESSION_SIGN_OUT]: ({ commit }) => {
    Vue.firebase.auth()
      .signOut()
      .then(() => {
        commit(constants.SESSION_SET_PROPERTY, { user: {} });
      });
  },
};

const mutations = {
  // eslint-disable-next-line no-shadow
  [constants.SESSION_SET_PROPERTY]: (state, data) => {
    const [[property, value]] = Object.entries(data);
    state[property] = value;
  },
};

const getters = {
  // eslint-disable-next-line no-shadow
  [constants.SESSION_IS_LOGGED_IN]: (state) => !!Object.keys(state.user).length,
};

export default {
  state,
  actions,
  mutations,
  getters,
};

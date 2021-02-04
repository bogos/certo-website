<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{name: 'home'}">
        Etheachers
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02"
              aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'about'}">
              About
            </router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link" :to="{name: 'dashboard'}">
              Dashboard
            </router-link>
          </li>
        </ul>
        <div class="d-flex" v-if="isLoggedIn">
          <button class="btn btn-secondary" type="button" @click="logOut">Sign out</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import * as constants from '@/store/constants';

export default {
  name: 'Top',
  computed: {
    ...mapGetters({
      isLoggedIn: constants.SESSION_IS_LOGGED_IN,
    }),
  },
  methods: {
    ...mapActions({
      signOut: constants.SESSION_SIGN_OUT,
    }),
    logOut() {
      this.signOut();
      this.$router.push({ name: 'home' });
    },
  },
};
</script>

<template>
  <div>
    <div class="row">
      <form @submit.prevent="login">
        <div class="col-sm col-md-6">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" placeholder="name@example.com"
                   autocomplete="off" v-model="credentials.loginEmail" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password"
                   v-model="credentials.loginPassword"
                   required>
          </div>
          <div class="mb-3 d-grid gap-2 col-6 mx-auto">
            <button class="btn btn-primary">
              Sign in
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import * as constants from '@/store/constants';

export default {
  name: 'Login',
  data() {
    return {
      credentials: {
        loginEmail: null,
        loginPassword: null,
      },
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: constants.SESSION_IS_LOGGED_IN,
    }),
  },
  watch: {
    isLoggedIn(val) {
      if (val) {
        this.$router.push({ name: 'dashboard' });
      }
    },
  },
  methods: {
    ...mapActions({
      signIn: constants.SESSION_SIGN_IN,
    }),
    login() {
      this.signIn(this.credentials);
    },
  },
  mounted() {
    if (this.isLoggedIn) {
      this.$router.push({ name: 'dashboard' });
    }
  },
};
</script>

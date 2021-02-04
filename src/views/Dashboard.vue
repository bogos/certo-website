<template v-if="user">
    <div class="alert alert-warning" role="alert" v-if="!user.emailVerified">
      <template v-if="sent">
        Check your email, logout and login again.
      </template>
      <template v-else>
        Your email hasn't been verified yet. Please click
        <a class="alert-link" @click="sendVerificationEmail">here</a>
        to resend it.
      </template>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Dashboard',
  data() {
    return {
      sent: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.Session.user,
    }),
  },
  methods: {
    sendVerificationEmail() {
      this.$firebase.auth()
        .currentUser
        .sendEmailVerification()
        .then(console.log)
        .catch(console.error);
      this.sent = true;
    },
  },
};
</script>

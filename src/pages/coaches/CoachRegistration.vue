<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-coach="saveCoach"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },
  methods: {
    saveCoach(coach) {
      this.$store.dispatch('coaches/registerCoach', coach);
      this.$router.replace('/coaches');
    },
  },
}
</script>
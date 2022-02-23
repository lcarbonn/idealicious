<!-- Main page -->
<template>
  <md-app md-waterfall md-mode="fixed">
    <md-app-toolbar class="md-small md-dense md-primary">
      <span class="md-title">
        <n-link to="/" class="md-title n-link">Idealicious</n-link>
      </span>
    </md-app-toolbar>
    <md-app-content>
      <AdminAddGame @addGame="addGame" />
      <BaseSnackbar/>
    </md-app-content>
  </md-app>
</template>

<script>
import Snackbar from '~/components/base/Snackbar.vue';
export default {
  components: { Snackbar },
  name: "IndexPage",
  data: () => ({
    game: "",
  }),

  methods: {
    addGame(game) {
      if (game != null) {
        this.$store.dispatch("games/addGame", game).then(() => {
          this.$router.push("/admin/game/" + game.id);
          this.$store.dispatch("snackbar/setSnackbarMessage", { message: "Game added" });
        });
      }
    },
  },
};
</script>

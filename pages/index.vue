<!-- Main page -->
<template>
  <md-app md-waterfall md-mode="fixed">
    <md-app-toolbar class="md-small md-dense md-primary">
      <span class="md-title">
        <n-link to="/" class="md-title n-link">Idealicious</n-link>
      </span>
    </md-app-toolbar>
    <md-app-content>
      <GameAddGame @addGame="addGame" />
      <BaseSnackbar/>
      <div class="md-layout md-alignment-bottom-center md-body-1">
        <span>Copyright © 2022 - Agilized in Toulouse, France</span>
      </div>
    </md-app-content>
  </md-app>
</template>

<script>
export default {
  name: "IndexPage",

  data: () => ({
    game: "",
  }),

  methods: {
    addGame(game) {
      if (game != null) {
        this.$store.dispatch("games/addGame", game).then(() => {
          this.$router.push("/game/" + game.id);
          this.$store.dispatch("snackbar/setSnackbarMessage", { message: "Game added" });
        });
      }
    },
  },
};
</script>

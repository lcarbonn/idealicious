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
          this.$router.push("/admin/game/" + game.id);
        });
      }
    },
  },
};
</script>

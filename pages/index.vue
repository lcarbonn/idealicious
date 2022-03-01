<!-- Main page -->
<template>

  <GameAddGame @addGame="addGame" />

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

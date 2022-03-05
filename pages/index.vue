<!-- Main page -->
<template>
  <div>
    <div>
      <h2>Welcome to Idealicious</h2>
      <h3>Idealicious let you generate great ideas</h3>
      <h3>Idealicious is based on the "Exquisite Corpse" game</h3>
      <h3>Enter the challenge of the game</h3>
      <h3>Then share the game to other players</h3>
    </div>
    <GameAddGame @addGame="addGame" />
  </div>

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

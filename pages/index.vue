<!-- Main page -->
<template>
  <div>
    <div>
      <div>Idealicious let you generate great ideas</div>
      <div>Idealicious is based on the "Exquisite Corpse" game</div>
      <div>Enter the challenge of the game</div>
      <div>Then share the game to friends</div>
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

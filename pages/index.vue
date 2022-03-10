<!-- Main page -->
<template>
  <div>
    <div>
        <md-card class="md-layout md-alignment-top-center">
          <md-card-content>
            <h2>Welcome to Idealicious</h2>
            <div>Idealicious let you generate great ideas</div>
            <div>Idealicious is based on the "Exquisite Corpse" game</div>
            <div>Enter the challenge of the game</div>
            <div>Then share the game to other players</div>
          </md-card-content>
        </md-card>
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

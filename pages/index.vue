<!-- Main page -->
<template>
  <div>
    <div>
        <md-card class="md-layout md-alignment-top-center">
          <md-card-content>
            <h2>{{$t('welcome')}}</h2>
            <div>{{$t('welcome2')}}</div>
            <div>{{$t('welcome3')}}</div>
            <p/>
            <div>{{$t('welcome4')}}</div>
            <div>{{$t('welcome5')}}</div>
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

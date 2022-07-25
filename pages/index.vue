<!-- Main page -->
<template>
  <div>
    <div>
      <b-card :title="$t('welcome')">
        <b-card-text>
          <div>{{$t('welcome2')}}</div>
          <div>{{$t('welcome3')}}</div>
          <p />
          <div>{{$t('welcome4')}}</div>
          <div>{{$t('welcome5')}}</div>
        </b-card-text>
      </b-card>
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
          this.$store.dispatch("snackbar/setSnackbarMessage", { message: this.$i18n.t('addGameSnack') });
        });
      }
    },
  },
};
</script>

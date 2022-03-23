<!-- Game page -->
<template>
  <div>
    <md-card>
      <md-card-content>
        <div class="md-layout md-alignment-top-center">
          <span>{{$t('adminGameCopyLink')}}</span>
        </div>
        <div class="md-layout md-alignment-center-center">
          <NuxtLink class="md-accent" v-if="game" :to="'/join/' + game.id" target="_blank">{{gamePath}}</NuxtLink>
          <md-button class="md-icon-button md-accent" @click="copyToClipboard">
            <md-icon>content_copy</md-icon>
            <md-tooltip md-direction="top">{{$t('adminGameClipboard')}}</md-tooltip>
          </md-button>
        </div>
        <div class="md-layout md-alignment-top-center">
          <span>{{$t('adminGameNbPlayers')}} : {{nbPlayers}}</span>
        </div>
      </md-card-content>
      <md-card-actions class="md-layout md-alignment-top-center">
        <md-button :disabled="this.started" class="md-accent md-icon-button md-raised" @click="startGame">
          <md-icon>start</md-icon>
          <md-tooltip md-direction="top">{{$t('adminGameStart')}}</md-tooltip>
        </md-button>
        <md-button :disabled="!this.started" class="md-accent md-icon-button md-raised" @click="endGame">
          <md-icon>stop</md-icon>
          <md-tooltip md-direction="top">{{$t('adminGameEnd')}}</md-tooltip>
        </md-button>
        <md-button :disabled="this.started" class="md-accent md-icon-button md-raised" @click="resetLoves">
          <md-icon>restart_alt</md-icon>
          <md-tooltip md-direction="top">{{$t('adminGameResetLoves')}}</md-tooltip>
        </md-button>
        <md-button :disabled="!this.started" class="md-accent md-icon-button md-raised" @click="exportIdeas">
          <md-icon>download</md-icon>
          <md-tooltip md-direction="top">{{$t('adminGameExportIdeas')}}</md-tooltip>
        </md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>

export default {
  name: "AdminGameComp",

  props: {
    game: Object,
    nbPlayers: 0
  },

  computed: {
    gamePath() {
      if(this.game) return window.location.origin + '/join/' + this.game.id
      else return ""
    },
    started() {
      console.debug("game"+this.game)
      if(this.game) return this.game.started && !this.game.ended
      return false
    }
  },

  methods: {
    startGame() {
      this.$emit("startGame")
    },
    endGame() {
      this.$emit("endGame")
    },
    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(this.gamePath);
        console.debug(this.$i18n.locale +" " +this.$i18n.t('adminGameCopyDone'))
        this.$store.dispatch("snackbar/setSnackbarMessage", { message: this.$i18n.t('adminGameCopyDone') });
      } catch($e) {
        this.$store.dispatch("snackbar/setSnackbarMessage", { message: this.$i18n.t('adminGameCopyError') });
      }
    },
    resetLoves() {
      this.$emit("resetLoves")
    },
    exportIdeas() {
      this.$emit("exportIdeas")
    }
  },
};
</script>

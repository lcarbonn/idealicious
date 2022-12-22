<!-- Admin Game page -->
<template>
  <div>
    <b-card>
      <b-card-text>
        <b-container>
          <b-row>
            <b-col>
              <span>{{$t('adminGameCopyLink')}}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <NuxtLink v-if="game" :to="'/join/' + game.id" target="_blank">{{gamePath}}</NuxtLink>
            </b-col>
            <b-col>
              <b-button id="clipboard" variant="secondary" @click="copyToClipboard">
                <b-icon icon="clipboard"></b-icon>
              </b-button>
              <b-tooltip target="clipboard" triggers="hover">{{ $t('adminGameClipboard')}}</b-tooltip>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <span>{{$t('adminGameNbPlayers')}} : {{nbPlayers}}</span>
            </b-col>
          </b-row>
          <b-row class="text-center">
            <b-col>
              <h2 v-if="game.ended">{{$t('pidGameEnded')}}</h2>
              <h2 v-if="game.started && !game.ended">{{$t('pidGameStarted')}}</h2>
            </b-col>
          </b-row>
        </b-container>
      </b-card-text>
      <b-container class="text-center">
        <b-row>
          <b-col>
            <b-button id="start" variant="secondary" @click="startGame" :disabled="this.started">
              <b-icon icon="play-circle"></b-icon>
            </b-button>
            <b-tooltip target="start" triggers="hover">{{ $t('adminGameStart')}}</b-tooltip>
          </b-col>
          <b-col>
            <b-button id="stop" variant="secondary" @click="endGame" :disabled="!this.started">
              <b-icon icon="stop-circle"></b-icon>
            </b-button>
            <b-tooltip target="stop" triggers="hover">{{ $t('adminGameEnd')}}</b-tooltip>
          </b-col>
          <b-col>
            <b-button id="reset" variant="secondary" @click="resetLoves" :disabled="this.started">
              <b-icon icon="arrow-counterclockwise"></b-icon>
            </b-button>
            <b-tooltip target="reset" triggers="hover">{{ $t('adminGameResetLoves')}}</b-tooltip>
          </b-col>
          <b-col>
            <b-button id="download" variant="secondary" @click="exportIdeas" :disabled="this.started">
              <b-icon icon="download"></b-icon>
            </b-button>
            <b-tooltip target="download" triggers="hover">{{ $t('adminGameExportIdeas')}}</b-tooltip>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>
import { BIcon, BIconPlayCircle, BIconClipboard, BIconStopCircle, BIconArrowCounterclockwise, BIconDownload } from 'bootstrap-vue'

export default {
  
  name: "AdminGameComp",

  components: {
    BIcon,
    BIconPlayCircle,
    BIconClipboard,
    BIconStopCircle,
    BIconArrowCounterclockwise,
    BIconDownload
  },

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

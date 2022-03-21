<!-- Ideas page -->
<template>
  <md-card v-if="idea">
    <md-card-content>
      {{idea.message}}
    </md-card-content>
    <md-card-actions>
      <md-badge v-if="gameMode" class="md-primary" :md-content="nbLoved" md-dense>
        <md-button class="md-icon-button" :class="getLovedClass()" @click="loveIdea">
          <md-icon>favorite</md-icon>
          <md-tooltip md-direction="top">{{$t('ideaCardNbVote')}}</md-tooltip>
        </md-button>
      </md-badge>
      <md-button v-else class="md-icon-button" :class="getLovedClass()" @click="loveIdea">
        <md-icon>favorite</md-icon>
        <md-tooltip md-direction="top">{{$t('ideaCardVote')}}</md-tooltip>
      </md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  name: "IdeaCardComp",
  props: {
    idea: Object,
    mode:String
  },

  data: () => ({
    isLoved: false
  }),

  computed: {
    isDisable() {
      return (this.mode=="game")
    },
    nbLoved() {
      return (this.idea.loved)
    },
    gameMode() {
      return (this.mode=="game")
    }
  },

  watch: {
    // in case of loves reset
    idea(newIdea, oldIdea) {
      if (newIdea.loved == 0) {
        this.isLoved = false
      }
    }
  },

  methods: {
    loveIdea() {
      console.debug("love idea:" + this.idea.message)
      if(!this.gameMode) {
        this.isLoved = !this.isLoved
        this.$emit("loveIdea", {
        idea:this.idea,
        isLoved:this.isLoved
        });
        if(this.isLoved) this.$store.dispatch("snackbar/setSnackbarMessage", { message: this.$i18n.t('ideaCardLike') });
        else this.$store.dispatch("snackbar/setSnackbarMessage", { message: this.$i18n.t('ideaCardUnlike') });
      } else {
        this.$store.dispatch("snackbar/setSnackbarMessage", { message: this.$i18n.t('ideaCardLikeDisabled') });
      }
    },
    getLovedClass() {
      if(this.mode=="player" && this.isLoved) return "md-raised md-accent"
      if(this.mode=="game" && this.idea.loved>0) return "md-raised md-accent"
    }
  },

};
</script>

<style lang="scss" scoped>
.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
</style>

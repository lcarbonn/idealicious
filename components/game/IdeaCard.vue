<!-- Ideas page -->
<template>
  <b-card v-if="idea">
    <b-card-text>
      {{idea.message}}
    </b-card-text>
    <b-avatar v-if="gameMode" id="loveButton" :variant="getLovedClass()" icon="heart-fill" :badge="nbLoved">
    </b-avatar>
    <b-avatar v-else id="loveButton" button :variant="getLovedClass()" icon="heart-fill" @click="loveIdea">
    </b-avatar>
    <b-tooltip v-if="gameMode" target="loveButton" triggers="hover">{{$t('ideaCardNbVote')}}</b-tooltip>
    <b-tooltip v-else target="loveButton" triggers="hover">{{ $t('ideaCardVote')}}</b-tooltip>
  </b-card>
</template>

<script>
import { BIcon, BIconHeartFill } from 'bootstrap-vue'

export default {
  name: "IdeaCardComp",

  components: {
    BIcon,
    BIconHeartFill
  },


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
      if (this.mode == "player" && this.isLoved) return "secondary"
      if (this.mode == "game" && this.idea.loved > 0) return "secondary"
      return "light"
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

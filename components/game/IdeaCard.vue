<!-- Ideas page -->
<template>
  <b-card v-if="idea" class="mb-1 shadow-sm">
    <b-card-text>
      {{idea.message}}
    </b-card-text>
    <template v-if="gameMode">
      <b-avatar :id="idea.id" :variant="getLovedClass()" icon="heart" :badge="idea.loved">
      </b-avatar>
      <b-tooltip :target="idea.id" triggers="hover">{{$t('ideaCardNbVote')}}</b-tooltip>
    </template>
    <template v-else>
      <b-avatar :id="idea.id" button :variant="getLovedClass()" icon="heart" @click="loveIdea">
      </b-avatar>
      <b-tooltip :target="idea.id" triggers="hover">{{ $t('ideaCardVote')}}</b-tooltip>
    </template>
  </b-card>
</template>

<script>
import { BIcon, BIconHeart } from 'bootstrap-vue'

export default {
  name: "IdeaCardComp",

  components: {
    BIcon,
    BIconHeart
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

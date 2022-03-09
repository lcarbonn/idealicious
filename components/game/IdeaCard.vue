<!-- Ideas page -->
<template>
  <md-card v-if="idea">
    <md-card-content>
      {{idea.message}}
    </md-card-content>
    <md-card-actions>
      <md-badge v-if="gameMode && nbLoved>0" class="md-primary" :md-content="nbLoved" md-dense>
        <md-button class="md-icon-button" :class="getLovedClass()" @click="loveIdea">
          <md-icon>favorite</md-icon>
        </md-button>
      </md-badge>
        <md-button v-else class="md-icon-button" :class="getLovedClass()" @click="loveIdea">
          <md-icon>favorite</md-icon>
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

  methods: {
    loveIdea() {
      console.debug("love idea:" + this.idea.message)
      if(!this.gameMode) {
        this.isLoved = !this.isLoved
        this.$emit("loveIdea", {
        idea:this.idea,
        isLoved:this.isLoved
        });
        if(this.isLoved)         this.$store.dispatch("snackbar/setSnackbarMessage", { message: "Thanks for your vote ;-)" });
        else         this.$store.dispatch("snackbar/setSnackbarMessage", { message: "Ok, you still can change your choice :-(" });
      } else {
        this.$store.dispatch("snackbar/setSnackbarMessage", { message: "Hey, you're the game master, not a player !!!" });
      }
    },
    getLovedClass() {
      if(this.mode=="player" && this.isLoved) return "md-raised md-primary"
      if(this.mode=="game" && this.idea.loved>0) return "md-raised md-primary"
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

<!-- Game page -->
<template>
  <div>
    <div class="decks">
      <div class="deck" v-for="(deck, index) in ideas" :key="deck.id" :deck="deck">
        <div>
        <md-avatar class="md-accent md-avatar-icon">
          <md-icon>style</md-icon>
        </md-avatar>
        <span>Deck {{index+1}}</span>
        </div>
        <GameIdeaCard @loveIdea="loveIdea" v-for="idea in deck" :key="idea.id" :idea="idea" :mode="mode"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IdeasChainComp",

  props: {
    ideas: [],
    mode: String
  },

  methods: {
    loveIdea(param) {
      console.debug("chain love idea:" + param.idea.message),
      this.$emit("loveIdea", param);
    }
  },

};
</script>

<style lang="scss" scoped>
@media (min-width: 600px) {
  .decks {
    display: flex;
    flex-direction:row;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  .deck {
    display: flex;
    flex-direction:column;
  }
}
@media (max-width: 600px) {
  .decks {
    display: block;
  }
  .deck {
    display: block;
  }
}
</style>
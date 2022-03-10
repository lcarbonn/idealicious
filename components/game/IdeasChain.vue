<!-- Game page -->
<template>
  <div>
    <div class="decks">
      <div class="deck" v-for="(deck, index) in ideas" :key="deck.id" :deck="deck">
        <div class="md-layout md-alignment-center-center">
          <div>
          <md-avatar class="md-accent md-avatar-icon">
            <md-icon>style</md-icon>
          </md-avatar>
          </div>
          <div>
          <span>Deck {{index+1}}</span>
          </div>
        </div>
        <GameIdeaCard @loveIdea="loveIdea" v-for="idea in deck" :key="idea.id" :idea="idea" :mode="mode"/>
        <p/>
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
</style>
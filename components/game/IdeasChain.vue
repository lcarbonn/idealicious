<!-- Game page -->
<template>
  <div>
    <div class="decks">
      <div class="deck" v-for="(deck, index) in ideas" :key="deck.id" :deck="deck">
        <div>Deck {{ index+1 }}</div>
        <GameIdeaCard @loveIdea="loveIdea" v-for="idea in deck" :key="idea.id" :idea="idea" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IdeasChainComp",

  props: {
    ideas: [],
  },

  methods: {
    loveIdea(idea) {
      console.debug("chain love idea:" + idea.message),
      this.$emit("loveIdea", idea);
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
<!-- Game page -->
<template>
  <div>
    <div class="decks">
      <div class="deck" v-for="(deck, index) in ideas" :key="deck.id" :deck="deck">
        <b-container>
          <b-row align-h="center">
            <b-col md="auto">
              <b-avatar icon="card-list">
              </b-avatar>
              <span>&nbsp;{{$t('ideasChainDeck')}} {{index+1}}</span>
            </b-col>
          </b-row>
        </b-container>
        <GameIdeaCard @loveIdea="loveIdea" v-for="idea in deck" :key="idea.id" :idea="idea" :mode="mode" />
      </div>
    </div>
  </div>
</template>

<script>
import { BIcon, BIconCardList } from 'bootstrap-vue'

export default {
  name: "IdeasChainComp",

  components: {
    BIcon,
    BIconCardList
  },

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
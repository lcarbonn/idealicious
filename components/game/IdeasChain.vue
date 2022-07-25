<!-- Game page -->
<template>
  <b-container>
    <b-row align-h="around">
      <b-col v-for="(deck, index) in ideas" :key="deck.id" :deck="deck">
        <b-container class="text-center">
          <b-row class="mb-1">
            <b-col>
              <b-avatar icon="card-list">
              </b-avatar>
              <span>&nbsp;{{$t('ideasChainDeck')}} {{index+1}}</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <GameIdeaCard @loveIdea="loveIdea" v-for="idea in deck" :key="idea.id" :idea="idea" :mode="mode" />
            </b-col>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
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

<!-- Game page -->
<template>
  <div>
    <div>
    <IdeaCard v-for="idea in ideas"
              :key="idea.message"
              :idea="idea"/>
    </div>
    <div>
      <md-button class="md-primary" @click="back2Game">Back to the game</md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IdeaChain',

  props: {
      ideas:[]
  },

  methods: {
    back2Game() {
      this.$emit('back2Game')
    },
  }

}
</script>

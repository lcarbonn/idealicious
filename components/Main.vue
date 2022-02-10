<!-- Main page -->
<template>
    <md-app md-waterfall
            md-mode="fixed">
        <md-app-toolbar class="md-small md-dense md-primary">
          <span class="md-title">Idealicious</span>
        </md-app-toolbar>
        <md-app-drawer :md-active.sync="menuVisible">
        </md-app-drawer>
        <md-app-content>
          <PlayerGame @endGame="endGame"/>
          <IdeasChain :ideas="ideas"/>
        </md-app-content>
    </md-app>

</template>

<script>
export default {
  name: 'MainPage',
  data: () => ({
    ideas: [],
    menuVisible:false
  }),

  methods : {
    endGame(ideas) {
      console.log(ideas)
      this.ideas = ideas
    }
  }
}
</script>

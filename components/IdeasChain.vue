<!-- Game page -->
<template>
  <div>
    <IdeaCard v-for="idea in ideas"
              :key="idea.message"
              :idea="idea"/>
  </div>
</template>

<script>
export default {
  name: 'IdeaChain',
    props: {
        ideas:[]
    }
}
</script>

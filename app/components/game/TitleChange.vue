<template>
  <div>
      <BCard id="titleCard" bg-variant="primary" text-variant="light">
        <BCardTitle>
          <BLink v-if="!changeAsked" variant="light" class="nodecoLink" @click="changeName()">{{title}}</BLink>
          <BInputGroup v-if="changeAsked">
            <BFormInput
              id="gameTitle" 
              autofocus 
              v-model="newTitle" 
              :state="gameState" 
              @keydown.enter="changeTitle()"
              @keydown.escape="resetTitle()"
              maxlength="140" trim class="mb-0">
            </BFormInput>
            <BButton @click="resetTitle()"><X/></BButton>
          </BInputGroup>
        </BCardTitle>
      </BCard>
      <BTooltip target="titleCard" triggers="hover">{{$t('adminGame.titleTooltip')}}</BTooltip>
  </div>
</template>

<script setup lang="ts">
  // icon
  import X from '~icons/bi/x'
  
  // local ref
  const changeAsked = ref(false)
  const newTitle = ref()

  // component props
  const props = defineProps({
    title: {
        type: String,
        default:null
    }
  });

  const changeName = () => {
    // console.log("change name")
    newTitle.value = props.title
    changeAsked.value = true
  }

    // computed properties
    const gameState = computed(() => {
      return (newTitle.value != null && newTitle.value != "") ? true : false
    })

    // emits declaration
    const emit = defineEmits(['updateGameTitle'])

    // methods
    const changeTitle = () => {
      changeAsked.value = false
      emit("updateGameTitle", newTitle.value.trim());
    }

    const resetTitle = () => {
      // console.log("title reset")
      changeAsked.value = false
      newTitle.value = props.title
    }

</script>
<style scoped>
.nodecoLink {
  text-decoration: none !important;
}
</style>

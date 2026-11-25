<template>
  <div>
    <slot/>
    <UTooltip :text="t('gamesList.play')">
      <UButton icon="streamline-color:button-play-flat" :to="'/game/'+game.id" class="mr-1" size="sm"></UButton>
    </UTooltip>
    <UTooltip :text="t('gamesList.ideas')">
      <UButton icon="streamline-color:lightbulb-flat" :to="'/game/'+game.id+'/ideas/'" class="mr-1" size="sm"></UButton>
    </UTooltip>
    <UTooltip :text="t('gamesList.people')">
      <UButton icon="streamline-color:user-multiple-group-flat" :to="path+game.id+'/players/'" class="mr-1" size="sm"></UButton>
    </UTooltip>
    <UTooltip :text="t('gamesList.delete')">
      <UButton icon="streamline-color:recycle-bin-2-flat" @click="askForDeleteGame()" class="mr-1" size="sm"></UButton>
    </UTooltip>
  </div>
</template>
<script setup lang="ts">

    // for lang
    const { t } = useI18n()

    // props
    const props = defineProps<{
        game:IGame;
        isAdmin:boolean
    }>()

    // computed props
    const path = computed(() => {
        if (props.isAdmin) return "/admin/"
        else return "/game/"
    })

      // emits declaration
    const emit = defineEmits<{
      askForDeleteGame: [game:IGame];
    }>()

    const askForDeleteGame = () => {
      emit('askForDeleteGame', props.game)
    } 

</script>
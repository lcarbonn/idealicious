<template>
  <div>
    <UTooltip :text="t('gamesList.detail')">
      <UButton icon="streamline-color:pencil-flat" @click="expandGame()" class="mr-1" size="sm"></UButton>
    </UTooltip>
    <UTooltip :text="t('gamesList.play')">
      <UButton icon="streamline-color:button-play-flat" :to="'/game/'+row.original.id" class="mr-1" size="sm"></UButton>
    </UTooltip>
    <UTooltip :text="t('gamesList.ideas')">
      <UButton icon="streamline-color:lightbulb-flat" :to="'/game/'+row.original.id+'/ideas/'" class="mr-1" size="sm"></UButton>
    </UTooltip>
    <UTooltip :text="t('gamesList.people')">
      <UButton icon="streamline-color:user-multiple-group-flat" :to="path+row.original.id+'/players/'" class="mr-1" size="sm"></UButton>
    </UTooltip>
    <UTooltip :text="t('gamesList.delete')">
      <UButton icon="streamline-color:recycle-bin-2-flat" @click="askForDeleteGame()" class="mr-1" size="sm"></UButton>
    </UTooltip>
  </div>
</template>
<script setup lang="ts">
import type { TableRow } from '@nuxt/ui';

    // for lang
    const { t } = useI18n()

    // props
    const props = defineProps<{
        row:TableRow<IGame>;
        isAdmin:boolean
    }>()

    // computed props
    const path = computed(() => {
        if (props.isAdmin) return "/admin/"
        else return "/game/"
    })

      // emits declaration
    const emit = defineEmits<{
      expandGame: [row:TableRow<IGame>];
      askForDeleteGame: [game:IGame];
    }>()

    const expandGame = () => {
      emit('expandGame', props.row)
    }

    const askForDeleteGame = () => {
      emit('askForDeleteGame', props.row.original)
    } 

</script>
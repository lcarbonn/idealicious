<!-- Join page -->
<template>
    <UCard fluid class="text-center">
        <UFormField :label="t('joinGame.label')" :error="nameState" >
          <UInput autofocus id="joinGame" v-model="playerName" @keydown.enter="joinGame"
            maxlength="10" trim class="mb-0"></UInput>
        </UFormField>
      <template #footer>
        <UTooltip :text="t('joinGame.button')">
          <UButton :label="t('joinGame.button')" icon="streamline-color:add-1-flat" @click="joinGame" :disabled="nameState"></UButton>
        </UTooltip>
      </template>
    </UCard>
</template>
  
<script setup lang="ts">

    // const
    const { t } = useI18n()

    //local refs
    const playerName = ref()

    // computed propertie
    const nameState = computed(() => {
      return (playerName.value != null && playerName.value != "") ? false : true
    })

    // emits declaration
    const emit = defineEmits(['joinGame'])

    // emits méthods
    const joinGame = () => {
      if(nameState) emit('joinGame', playerName.value)
    }


</script>
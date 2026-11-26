<!-- Game page -->
<template>
  <UCard fluid class="text-center">
        <UFormField :label="t('addGame.label')" required :error="gameState">
          <UInput id="gameTitle"
            v-model="gameTitle" 
            :placeholder="t('addGame.placeholder')"
            maxlength="140" 
            trim
            @keydown.enter="addNewGame"
            class="mb-0 w-full"/>
        </UFormField>
        <div class="items-center">
        <UTooltip :text="t('addGame.button')">
        <UButton
            icon="streamline-color:add-1-flat"
            :disabled="gameState"
            @click="addNewGame"
            :label="t('addGame.button')"
            class="mt-2"
          />
          </UTooltip>
        </div>
    </UCard>
</template>

<script setup lang="ts">

    // const
    const { t } = useI18n()

    // emits declaration
    const emit = defineEmits(['addGame'])

    //local refs
    const gameTitle = ref("")

    // computed properties
    const gameState = computed(() => {
      return (gameTitle.value != null && gameTitle.value != "") ? false : true
    })

    // methods
    const addNewGame = () => {
      emit("addGame", {
        title: gameTitle.value,
        started:false
      });
    }

</script>

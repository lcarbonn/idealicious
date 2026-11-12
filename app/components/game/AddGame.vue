<!-- Game page -->
<template>
  <UCard style="border-radius: 1.25rem;">
        <UFormField :label="t('addGame.label')" required :error="gameState">
          <UInput id="gameTitle"
            v-model="gameTitle" 
            :placeholder="t('addGame.placeholder')"
            maxlength="140" 
            trim
            @keydown.enter="addNewGame"
            class="mb-0 w-full"/>
        </UFormField>
        <UTooltip :text="t('addGame.button')">
        <UButton
            icon="streamline-color:add-1-flat"
            size="sm"
            variant="subtle"
            :disabled="gameState"
            @click="addNewGame"
            :label="t('addGame.button')"
            class="mt-2"
          />
          </UTooltip>
    <!-- <BContainer fluid>
      <BRow>
        <BCol>
          <BFormGroup :label="t('addGame.label')" label-for="gameTitle" description="" class="mb-0">
            <BFormInput id="gameTitle" v-model="gameTitle" :state="gameState" @keydown.enter="addNewGame"
              :placeholder="t('addGame.placeholder')"
              maxlength="140" trim class="mb-0"></BFormInput>
          </BFormGroup>
        </BCol>
      </BRow>
      <BRow align-h="center"  class="mt-2">
        <BCol cols="auto">
          <BButton pill id="addButton" variant="secondary" @click="addNewGame" :disabled="!gameState">
            <PlusCircleFill/> {{t('addGame.button')}}
          </BButton>
          <BTooltip target="addButton" triggers="hover">{{t('addGame.button')}}</BTooltip>
        </BCol>
      </BRow>
    </BContainer> -->
    </UCard>
</template>

<script setup lang="ts">

    // icons
    // import PlusCircleFill from '~icons/bi/plus-circle-fill'

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

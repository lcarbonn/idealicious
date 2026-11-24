<template>
  <div>
        <UPageCard class="mb-3 mt-3 text-inverted bg-primary">
          <template #title>
            <UTooltip :text="t('adminGame.titleTooltip')" v-if="!changeAsked" >
              <ULink @click="changeName()" variant="light" class="text-inverted">{{title}}</ULink>
            </UTooltip>
            <UFormField v-else required :error="gameState">
              <UInput
                id="gameTitle" 
                autofocus 
                v-model="newTitle" 
                @keydown.enter="changeTitle()"
                @keydown.escape="resetTitle()"
                maxlength="140" trim class="mb-0 w-full">
                <template #trailing>
                  <UButton @click="resetTitle()" 
                  icon="i-lucide-circle-x" 
                  color="neutral"
                  variant="link"></UButton>
                </template>                
              </UInput>
            </UFormField>
          </template>
        </UPageCard>
  </div>
</template>

<script setup lang="ts">

    // for lang
    const { t } = useI18n()

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
      return (newTitle.value != null && newTitle.value != "") ? false : true
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

<template>
    <UCard fluid v-if="game" class="text-center" :title="t('adminGame.copyLink')">
        <qrcode-vue :value="gameUrl" :size="100"/>
        <template #footer>
          <UTooltip :text="t('adminGame.clipboard')">
            <UButton :label="t('adminGame.clipboard')" @click="copyToClipboard" icon="streamline-color:clipboard-add-flat"/>
          </UTooltip>
        </template>
    </UCard>
</template>

<script setup lang="ts">

    // icons
    import QrcodeVue from 'qrcode.vue'

    // const
    const { t } = useI18n()

    // props
    const props = defineProps({
      game: {
          type: Game,
          default: null
      }
    })

  // computed props
  const gamePath = computed(() => {
    if(props.game) return '/join/' + props.game.id
      else return ""
  })
  const gameUrl = computed(() => {
    if(props.game) return window.location.origin + gamePath.value
      else return ""
  })

  // methods
  const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(gameUrl.value);
        messageToSnack(t('adminGame.copyDone'))
      } catch($e) {
        messageToSnack(t('adminGame.copyError'))
      }
  }

</script>
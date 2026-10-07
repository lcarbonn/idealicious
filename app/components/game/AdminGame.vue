<template>
    <div>
      <BContainer fluid v-if="game" class="text-center">
          <BRow>
            <BCol>
                <qrcode-vue :value="gameUrl" :size="100"/>
            </BCol>
          </BRow>
          <BRow>
              <BCol>
                  <span>{{t('adminGame.copyLink')}}&nbsp;</span>
              </BCol>
          </BRow>
          <BRow>
              <BCol>
                  <BButton pill id="clipboard" variant="secondary" @click="copyToClipboard">
                    <Clipboard/> {{ t('adminGame.clipboard')}}
                  </BButton>
                  <b-tooltip target="clipboard" triggers="hover">{{ t('adminGame.clipboard')}}</b-tooltip>
              </BCol>
          </BRow>
      </BContainer> 
    </div>
</template>

<script setup lang="ts">

    // icons
    import Clipboard from '~icons/bi/clipboard'
    import QrcodeVue from 'qrcode.vue'

    // const
    const { t } = useI18n()
    //local ref
    const modal = ref(false)

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
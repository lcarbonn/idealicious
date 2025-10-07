<!-- Join page -->
<template>
    <BContainer fluid>
        <BRow>
          <BCol>
            <BFormGroup :label="t('joinGame.label')" label-for="joinGame" description="" class="mb-0">
              <BFormInput autofocus id="joinGame" v-model="playerName" :state="nameState" @keydown.enter="joinGame"
                maxlength="10" trim class="mb-0"></BFormInput>
            </BFormGroup>
          </BCol>
        </BRow>
        <BRow align-h="center">
          <BCol md="auto">
            <BButton id="join" variant="secondary" @click="joinGame" :disabled="!nameState">
              <PlusCircleFill/> {{ t('joinGame.button')}}
            </BButton>
            <b-tooltip target="join" triggers="hover">{{ t('joinGame.button')}}</b-tooltip>
          </BCol>
        </BRow>
    </BContainer>
</template>
  
<script setup lang="ts">

    // icons
    import PlusCircleFill from '~icons/bi/plus-circle-fill'

    // const
    const { t } = useI18n()

    //local refs
    const playerName = ref()

    // computed propertie
    const nameState = computed(() => {
      return (playerName.value != null && playerName.value != "") ? true : false
    })

    // emits declaration
    const emit = defineEmits(['joinGame'])

    // emits méthods
    const joinGame = () => {
      if(nameState) emit('joinGame', playerName.value)
    }


</script>
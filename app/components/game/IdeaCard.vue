<!-- Idea page -->
<template>
    <UCard v-if="idea" :class="[getColor(props.deckId),'shadow-xl']" :title="idea.message">
      <UPageColumns
        :ui= "{
            base: 'relative columns-2 md:columns-2 lg:columns-2 gap-8'
        }"
      >
        <GamePlayer :player="player" :uid="uid"/>
        <template v-if="disabled">
          <UTooltip :text="getLovedMessage()">
            <UBadge :color="getLovedClass()"
                :avatar="{
                icon: 'streamline-color:hearts-symbol-flat',
                loading: 'lazy',
                }">
                <template #default>
                  {{idea.loved}}  
                </template>
            </UBadge>
          </UTooltip>
        </template>
        <template v-else>
          <UTooltip :text="t('idea.cardVote')">
            <UButton :color="getLovedClass()" variant="solid" @click="loveIdea()" icon="streamline-color:hearts-symbol-flat"/>
          </UTooltip>
        </template>
      </UPageColumns>
    </UCard>
  </template>

<script setup lang="ts">

    // const
    const { t } = useI18n()
    
    //local ref
    const isLoved = ref(false)

    // props
    const props = defineProps({
      idea: {
          type: Idea,
          default: undefined
      },
      uid: {
        type:String,
        default:null
      },
      disabled: {
        type:Boolean,
        default: false
      },
      deckId :{
        type:Number,
        default:0
      },
      player: {
        type:Player,
        default:null
      }
    })

    // checking if idea is loved by the actual player
    onMounted(() => {
      if(props.idea?.lovingPlayers.includes(props.uid)) {
          isLoved.value = true
        }
    })

    // watch the idea in case of love reset
    watch(() => props.idea, (newIdea) => {
        if (newIdea?.loved == 0) {
            isLoved.value = false
        }
    })

    // computed props
    // const bgColor = computed(() =>
    //   getColor(props.deckId)
    // )

    // methods
    const isMyVote = (idea:IIdea|undefined) => {
        return (props.uid && idea && idea.lovingPlayers?.indexOf(props.uid)!=-1)
    }
    const isMyIdea = (idea:IIdea|undefined) => {
        return (props.uid && idea && idea.playerId == props.uid)
    }

    // methods
    // ordre is important
    const getLovedClass = () => {
      if (isMyVote(props.idea)) return "warning"
      if (isMyIdea(props.idea)) return "success"
      if (props.disabled && props.idea && props.idea.loved > 0) return "warning"
      // if (!props.disabled && isLoved.value) return "secondary"
      // if (props.disabled && isMyVote(props.idea)) return "error"
      // if (props.disabled && isMyIdea(props.idea)) return "warning"
      // if (props.disabled && props.idea && props.idea.loved > 0) return "secondary"
      return "primary"
    }
    const getLovedMessage = () => {
      if (props.disabled && isMyVote(props.idea)) return t('idea.myVote')
      if (props.disabled && isMyIdea(props.idea)) return t('idea.myIdea')
      return ''
    }

    // emits declaration
    const emit = defineEmits(['loveIdea'])

    const loveIdea = () => {
        if(!props.disabled && props.idea) {
            isLoved.value = !isLoved.value
            emit("loveIdea", {
                deckId:props.deckId,
                ideaId:props.idea.id,
                isLoved:isLoved.value
            });
            if(isLoved.value) messageToSnack(t('idea.cardLike'));
            else messageToSnack(t('idea.cardUnlike'))
        } else {
            messageToSnack(t('idea.cardLikeDisabled'))
        }
    }
</script>
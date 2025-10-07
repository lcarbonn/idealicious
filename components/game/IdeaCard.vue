<!-- Idea page -->
<template>
    <BCard v-if="idea" class="mb-1 shadow-sm" :class="getColor(deckId)">
      <BCardText>
        {{idea.message}}
      </BCardText>
      <template v-if="disabled">
        <BAvatar :id="idea.id" :variant="getLovedClass()">
          <template #badge v-if="idea.loved>0">
            {{idea.loved}}
          </template>
          <Heart/>
        </BAvatar>
        <b-tooltip :target="idea.id" triggers="hover" v-if="getLovedMessage()">{{ getLovedMessage() }}</b-tooltip>
      </template>
      <template v-else>
        <BAvatar :id="idea.id" button :variant="getLovedClass()" @click="loveIdea()"><Heart/></BAvatar>
        <b-tooltip :target="idea.id" triggers="hover">{{ t('idea.cardVote')}}</b-tooltip>
      </template>
    </BCard>
  </template>

<script setup lang="ts">

    // icons
    import Heart from '~icons/bi/heart'

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
      if (!props.disabled && isLoved.value) return "secondary"
      if (props.disabled && isMyVote(props.idea)) return "danger"
      if (props.disabled && isMyIdea(props.idea)) return "warning"
      if (props.disabled && props.idea && props.idea.loved > 0) return "secondary"
      return "light"
    }
    const getLovedMessage = () => {
      if (props.disabled && isMyVote(props.idea)) return t('idea.myVote')
      if (props.disabled && isMyIdea(props.idea)) return t('idea.myIdea')
      // if (props.disabled && props.idea && props.idea.loved > 0) return "secondary"
      return null
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
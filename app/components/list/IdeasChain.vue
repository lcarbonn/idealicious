<!-- Ideas chain page -->
<template>
    <div>
        <UCard v-if="decksWithIdeas.length==0">{{t('idea.chainEmpty')}}</UCard>
        <UPageGrid
            :ui= "{
                base: 'relative grid grid-cols-1 md:grid-cols-'+getmdcolumns+' lg:grid-cols-'+getlgcolumns+' gap-8'
            }"
            >
            <UPageList else v-for="(deck, index) in decksWithIdeas">
                <UBadge color="primary" class="mb-3"
                    :avatar="{
                    icon: 'streamline-color:bullet-list-flat',
                    loading: 'lazy'
                    }">
                    {{t('idea.chainDeck')}} {{index+1}}
                </UBadge>
                <UCard v-if="deck.length==0">{{t('idea.deckEmpty')}}</UCard>
                <GameIdeaCard else @loveIdea="loveIdea" v-for="idea in deck" :key="idea.id" 
                    :deckId= "index" 
                    :idea="(idea as Idea)" 
                    :uid="uid" 
                    disabled
                    :player="getIPlayer(idea.playerId)"
                    class="mb-3"/>
            </UPageList>
        </UPageGrid>
    </div>
</template>

<script setup lang="ts">

    // const
    const { t } = useI18n()
    // props
    const props = defineProps({
        gameId: {
            type: String,
            default:null
        },
        uid: {
            type: String,
            default:null
        },
        decksWithIdeas: {
            type: Array<Array<IIdea>>,
            default: []
        },
        disabled: {
            type: Boolean,
            default:false
        },
        players: {
            type: Array<IPlayer>,
            default:null
        },
    })

  // love an idea
  const loveIdea = (param:any) => {
    //   console.debug("pid love idea:" + param.ideaId)
      updateIdeaLoves(props.gameId, props.uid, param.deckId, param.ideaId, param.isLoved)
  }

  const maxLgDecks = 6
  const maxMdDecks = 3
  const cols = (max:number, index:number) => {
    let r = max
    if(index<max) r = index
    return r
  }

  const getmdcolumns = computed(() => {
    return cols(maxMdDecks, props.decksWithIdeas.length)
  })
  const getlgcolumns = computed(() => {
    return cols(maxLgDecks, props.decksWithIdeas.length)
  })
  const getIPlayer = (playerId:string) => {
    // console.log("playerId : "+playerId)
    return getPlayer(playerId, props.players)
  }

</script>
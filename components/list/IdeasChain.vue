<!-- Ideas chain page -->
<template>
    <BContainer id="decks">
        <BRow align-h="start" 
            :cols-lg="cols(maxLgDecks, decksWithIdeas.length)" 
            :cols-md="cols(maxMdDecks, decksWithIdeas.length)">
            <BCol v-if="decksWithIdeas.length==0">{{t('idea.chainEmpty')}}</BCol>
            <BCol v-else 
                :lg="modulo(maxLgDecks, decksWithIdeas.length)" 
                :md="modulo(maxMdDecks, decksWithIdeas.length)" 
                v-for="(deck, index) in decksWithIdeas" :id="'deck'+index">
                <BContainer class="text-center">
                    <BRow class="mb-1">
                        <BCol>
                            <BAvatar variant="info"><CardList/></BAvatar>
                            <span>&nbsp;{{t('idea.chainDeck')}} {{index+1}}</span>
                        </BCol>
                    </BRow>
                    <BRow>
                        <BCol v-if="deck.length==0">{{t('idea.deckEmpty')}}</BCol>
                        <BCol v-else>
                            <GameIdeaCard @loveIdea="loveIdea" v-for="idea in deck" :key="idea.id" :deckId= "index" :idea="(idea as Idea)" :uid="uid" :disabled="disabled"/>
                        </BCol>
                    </BRow>
                </BContainer>
            </BCol>
        </BRow>
    </BContainer>
</template>

<script setup lang="ts">

    // icons
    import type { ColsNumbers } from 'bootstrap-vue-next'
    import CardList from '~icons/bi/card-list'
    import Heart from '~icons/bi/heart'    

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
        }
    })

  // love an idea
  const loveIdea = (param:any) => {
      console.debug("pid love idea:" + param.ideaId)
      updateIdeaLoves(props.gameId, props.uid, param.deckId, param.ideaId, param.isLoved)
  }

  const maxLgDecks = 6
  const maxMdDecks = 3
  const cols = (max:number, index:number) => {
    let r = max
    if(index<max) r = index
    return r as ColsNumbers
  }
  const modulo = (max:number, index:number) => {
    let i = index
    if(index < max) i = index
    if(index > max ) i = max-(i%index)
    const r = 12/i
    return r as ColsNumbers
  }
</script>
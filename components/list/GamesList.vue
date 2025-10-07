<template>
  <div>
    <BTable
      striped
      hover
      stacked="lg"
      :fields="(fields as TableField[])"
      :items="games"
      show-empty
      :empty-text="t('gamesList.empty')"
    >
      <template #cell(user.name)="data">
        <span v-if="data.value">{{data.value}}</span>
        <span v-else>Anonymous</span>
      </template>
      <template #cell(show_details)="row">
          <BButton id="detail" class="mx-1" @click="row.toggleDetails" size="sm"><IconToggles/></BButton>
          <b-tooltip target="detail" triggers="hover">{{ t('gamesList.detail')}}</b-tooltip>
          <BButton id="play" class="mx-1" :to="'/game/'+row.item.id" size="sm"><IconPlay/></BButton>
          <b-tooltip target="play" triggers="hover">{{ t('gamesList.play')}}</b-tooltip>
          <BButton id="ideas" class="mx-1" :to="'/games/'+row.item.id+'/ideas/'" size="sm"><IconLightbulb/></BButton>
          <b-tooltip target="ideas" triggers="hover">{{ t('gamesList.ideas')}}</b-tooltip>
          <BButton id="people" class="mx-1" :to="path+'/'+row.item.id+'/players/'" size="sm"><IconPeople/></BButton>
          <b-tooltip target="people" triggers="hover">{{ t('gamesList.people')}}</b-tooltip>
          <BButton id="trash" class="mx-1" @click="askForDeleteGame(row.item as IGame)" size="sm"><IconTrash/></BButton>
          <b-tooltip target="trash" triggers="hover">{{ t('gamesList.delete')}}</b-tooltip>
      </template>

      <template #row-details="row">
        <BCard>
          <BRow v-if="row.item.user">
            <BCol class="text-sm-right"><b>Owner:</b></BCol>
            <BCol>{{ (row.item.user as IUser).email }}</BCol>
          </BRow>
          <BRow>
            <BCol class="text-sm-right"><b>Started:</b></BCol>
            <BCol><BFormCheckbox  v-model="(row.item as IGame).started" switch disabled/></BCol>
          </BRow>
          <BRow>
            <BCol class="text-sm-right"><b>Ended:</b></BCol>
            <BCol><BFormCheckbox  v-model="(row.item as IGame).ended" switch disabled/></BCol>
          </BRow>
        </BCard>
      </template>      
    </BTable>
    <BModal v-model="modal" @ok="confirmDelete" centered  :title="t('gamesList.deleteGameTitle')"> {{t('gamesList.deleteGameMessage')}}</BModal>
  </div>
</template>

<script setup lang="ts">
    import type { TableField, TableFieldRaw } from 'bootstrap-vue-next';
    
    // icons
    import IconTrash from '~icons/bi/trash'
    import IconPlay from '~icons/bi/play'
    import IconPeople from '~icons/bi/people'
    import IconToggles from '~icons/bi/toggles'
    import IconLightbulb from '~icons/bi/lightbulb'
    
    // for lang
    const { t } = useI18n()
    //local ref
    const modal = ref(false)
    const selectedGame = ref()

    // props
    const props = defineProps({
        isAdmin: {
            type: Boolean,
            default: false
        },
        games: {
            type: Array<IGame>,
            default: undefined
        },
    })

    // const fields for table
    let fields:TableFieldRaw<IGame>[] = []
    fields.push (
          {
            key: 'title',
            label: t('gamesList.table.title'),
            sortable: true,
          },
        )
        if (props.isAdmin) {
          fields.push (
            {
            key: 'user.name',
            label: t('gamesList.table.user'),
            sortable: true
            },
          )
        }
        fields.push (        
          {
            key: 'createdAt',
            label: t('gamesList.table.created'),
            sortable: true,
            formatter: (value) => {
                return dateFormatter(value)
            },
          },
          {
            key: 'updatedAt',
            label: t('gamesList.table.updated'),
            sortable: true,
            formatter: (value) => {
                return dateFormatter(value)
            },
          },
           {
            key: 'show_details',
            label: t('gamesList.table.actions'),
           },
        )

      // computed props
    const path = computed(() => {
        if (props.isAdmin) return "/admin"
        else return "/games"
    })

    // emits declaration
    const emit = defineEmits(['deleteGame'])

    // methodes
    const askForDeleteGame = (game:IGame) => {
      selectedGame.value = game
      modal.value = true
    }
    const confirmDelete = () => {
      emit('deleteGame', selectedGame.value)
    }

</script>

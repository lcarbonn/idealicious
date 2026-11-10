<template>
  <div>
    <UTable
      sticky
      :data="games"
      :columns="columns">
      <template #action-cell="{ row }">
        <ListGameButton
          :row="row"
          :isAdmin="isAdmin"
          @expand-game="expandGame"
          @ask-for-delete-game="askForDeleteGame"
          />
      </template>
    <template #expanded="{ row }">
        <UPageGrid v-if="row.original.user">
          <span class="text-sm-right"><b>Owner:</b></span>
          <span>{{ (row.original.user as IUser).email }}</span>
        </UPageGrid>
        <UFormField label="Started:">
          <USwitch v-model="(row.original as IGame).started" switch disabled/>
        </UFormField>
        <UFormField label="Ended:">
          <USwitch v-model="(row.original as IGame).ended" switch disabled/>
        </UFormField>
    </template>      
    </UTable>

    <!-- <BTable
      striped
      hover
      stacked="lg"
      :fields="fields"
      :items="games"
      show-empty
      :empty-text="t('gamesList.empty')"
    >
      <template #cell(name)="data">
        <span v-if="data.value">{{data.value}}</span>
        <span v-else>Anonymous</span>
      </template>
      <template #cell(show_details)="row">
          <BButton id="detail" class="mx-1" @click="row.toggleExpansion" size="sm"><IconToggles/></BButton>
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

      <template #row-expansion="row">
        <BCard>
          <BRow v-if="row.item.user">
            <span class="text-sm-right"><b>Owner:</b></span>
            <span>{{ (row.item.user as IUser).email }}</span>
          </BRow>
          <BRow>
            <span class="text-sm-right"><b>Started:</b></span>
            <span><BFormCheckbox  v-model="(row.item as IGame).started" switch disabled/></span>
          </BRow>
          <BRow>
            <span class="text-sm-right"><b>Ended:</b></span>
            <span><BFormCheckbox  v-model="(row.item as IGame).ended" switch disabled/></span>
          </BRow>
        </BCard>
      </template>      
    </BTable>
    <BModal v-model="modal" @ok="confirmDelete" centered  :title="t('gamesList.deleteGameTitle')"> {{t('gamesList.deleteGameMessage')}}</BModal> -->
  </div>
</template>

<script setup lang="ts">
  
    import type { TableColumn, TableRow } from '@nuxt/ui';
    
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

  const columns: TableColumn<IGame>[] = [
    {
      accessorKey: 'title',
      header: t('gamesList.table.title')
    },
    {
      accessorKey: 'createdAt',
      header: t('gamesList.table.created'),
      cell: ({ row }) => {
        return dateFormatter(row.original.createdAt)
      }
    },
    {
      accessorKey: 'updatedAt',
      header: t('gamesList.table.updated'),
      cell: ({ row }) => {
        return dateFormatter(row.original.updatedAt)
      }
    },
    {
      id: 'action'
    }
  ]

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

  const expandGame = (row:TableRow<IGame>) => {
    row.toggleExpanded()
  }

</script>

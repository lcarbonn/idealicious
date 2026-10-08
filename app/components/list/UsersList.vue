<template>
  <div>
    <b-table
      striped
      hover
      stacked="md"
      :fields="fields"
      :items="users"
      show-empty
      :empty-text="t('usersList.empty')"
    >
    <template #cell(isAdmin)="data">
      <BFormCheckbox  v-model="(data.value as boolean)" switch @click="changeIsAdmin(data.item)">
      </BFormCheckbox >
    </template>
    <template #cell(show_details)="row">
          <BButton id="trash" class="mx-1" @click="askForDeleteUser(row.item as IUser)" size="sm"><IconTrash/></BButton>
          <b-tooltip target="trash" triggers="hover">{{ t('usersList.delete')}}</b-tooltip>
      </template>
    </b-table>
    <BModal v-model="modal" @ok="confirmDelete" centered  :title="t('usersList.deleteUserTitle')"> {{t('usersList.deleteUserMessage')}}</BModal>
  </div>
</template>

<script setup lang="ts">
    import type { TableFieldRaw } from 'bootstrap-vue-next';
    // icons
    import IconTrash from '~icons/bi/trash'

    // for lang
    const { t } = useI18n()
  
    //local ref
    const modal = ref(false)
    const selectedUser = ref()

    // props
    const props = defineProps({
        users: {
            type: Array<IUser>,
            default: undefined
        },
    })

    // const fields for table
    let fields:TableFieldRaw<IUser>[] = [
            {
              key: 'name',
              label: t('usersList.table.name'),
              sortable: true,
            },
            {
              key: 'email',
              label: t('usersList.table.email'),
              sortable: true
            },
            {
              key: 'isAdmin',
              label: t('usersList.table.isAdmin'),
              sortable: true
            },
            {
              key: 'createdAt',
              label: t('usersList.table.created'),
              formatter: ( {value}) => (dateFormatter(value)),
              sortable: true
            },
            {
              key: 'updatedAt',
              label: t('usersList.table.updated'),
              formatter: ( {value}) => (dateFormatter(value)),
              sortable: true,
            },
            {
              key: 'show_details',
              label: t('usersList.table.actions'),
            }
          ]

  // emits declaration
  const emit = defineEmits(['deleteUser', 'changeIsAdmin'])


  const changeIsAdmin = (user:IUser) => {
    user.isAdmin = !user.isAdmin
    user.updatedAt = new Date().getTime()
    emit('changeIsAdmin', user)
  }

  // methodes
  const askForDeleteUser = (user:IUser) => {
    selectedUser.value = user
    modal.value = true
  }
  const confirmDelete = () => {
    emit('deleteUser', selectedUser.value.uid)
  }

</script>

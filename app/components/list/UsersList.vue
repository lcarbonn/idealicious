<template>
  <div>
    <UPageGrid class="grid-cols-2 mb-4">
      <UiListTypeSwitch v-model="listType" size="sm" class="justify-self-end md:col-start-3 lg:col-start-5"/>
    </UPageGrid>
    <LazyListUsersListCard v-if="listType=='card'"
      :users="users"
      @askForDeleteUser="askForDeleteUser"
      @changeIsAdmin="changeIsAdmin"
      />
    <LazyListUsersListTable v-if="listType=='table'"
      :users="users"
      @askForDeleteUser="askForDeleteUser"
      @changeIsAdmin="changeIsAdmin"
      />
    <UiSimpleModal
      :open="modalDeleteLigne"
      :title="t('usersList.deleteUserTitle')"
      :description="t('usersList.deleteUserMessage')"
      @on-ok="confirmDelete"/>
  </div>
</template>

<script setup lang="ts">

    // for lang
    const { t } = useI18n()
  
    //local ref
    const modalDeleteLigne = ref(new ModalShow())
    const selectedUser = ref()

    const listType = ref()

    // props
    const props = defineProps({
        users: {
            type: Array<IUser>,
            default: undefined
        },
    })

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
    modalDeleteLigne.value.show = !modalDeleteLigne.value.show;
  }
  const confirmDelete = () => {
    emit('deleteUser', selectedUser.value.uid)
  }

</script>

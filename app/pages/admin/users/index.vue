<template>
    <div class="mt-3">
        <GameTitle :title="t('pageTitle.usersList')"></GameTitle>
        <ListUsersList :users="users" @deleteUser="delUser" @changeIsAdmin="changeIsAdmin"></ListUsersList>
    </div>
</template>

<script setup lang="ts">

  // for lang
  const { t } = useI18n()

    // global refs
    const users = useUsers()

    // get the users
    onMounted(() => {
        getUsers()
    })

    const changeIsAdmin = (user:IUser) => {
        updateUserIsAdmin(user)
        .then(() => {
            messageToSnack(t("usersList.userUpdated")+" - "+ user.name)
        })
    }

    const delUser = (uid:string) => {
        deleteUser(uid)
        .then(()=>{
            messageToSnack(t('usersList.deleteUserConfirmed'))
        })
    }
</script>
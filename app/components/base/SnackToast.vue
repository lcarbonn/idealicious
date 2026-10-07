<template>
    <!-- BToastOrchestrator replaced by BApp in app.vue -->
</template>
<script setup lang="ts">

    const { create } = useToast()
    const snackbarMessage = useSnackBarMessage()

    // watch the message
    watch(() => snackbarMessage.value, async (newMessage) => {
      if(newMessage?.message != "") {
        if(newMessage.isError)
            await create({
                title:'Error',
                body: ''+newMessage.message ,
                color:'error',
                modelValue: 3000,
            }).show()
        else
            await create({
                title:'Idealicious',
                body: ''+newMessage.message,
                color:'info',
                modelValue: 3000,
            }).show()
      }
    })
</script>
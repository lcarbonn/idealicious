<template>
    <!-- to unable warning -->
    <span hidden></span>
</template>
<script setup lang="ts">
    import { useToast } from '@nuxt/ui/runtime/composables/useToast.js'
    const toast = useToast()
    const snackbarMessage = useSnackBarMessage()

    // watch the message
    watch(() => snackbarMessage.value, (newMessage) => {
      if(newMessage?.message != "") {
        if(newMessage.isError)
            toast.add({
                title:'Error',
                description: ''+newMessage.message ,
                color:'error',
                icon:'mdi:error'
            })
        else
            toast.add({
                title:'Idealicious',
                description: ''+newMessage.message,
                color:'primary',
                icon:'mdi:information'
            })
      }
    })
</script>
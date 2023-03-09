<template>
  <div class="d-flex justify-content-md-center bg-info text-white">Copyright © 2023 - Agilisé à Toulouse, France - V{{appVersion}}</div>
</template>

<script>
export default {
  name: 'FooterComp',

  props: {
    appVersion: ""
  }
}
</script>

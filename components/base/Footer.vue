<template>
  <div class="d-flex justify-content-md-center bg-info text-white">Copyright © 2023 - Agilisé à Toulouse, France - V{{appVersion}}
  -&nbsp;<a class="d-flex justify-content-md-center bg-info text-white" href="/mentions-legales">Mentions légales</a></div>
</template>

<script>
export default {
  name: 'FooterComp',

  props: {
    appVersion: ""
  }
}
</script>

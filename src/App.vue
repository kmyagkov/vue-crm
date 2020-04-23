<template>
  <div class="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
  import EmptyLayout from "@/layouts/Empty";
  import MainLayout from "@/layouts/Main";

  export default {
    components: {
      EmptyLayout,
      MainLayout
    },
    computed: {
      layout() {
        return `${this.$route.meta.layout || 'empty'}-layout`;
      }
    }
  }
</script>

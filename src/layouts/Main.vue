<template>
  <div class="app-main-layout">
    <Navbar v-on:burgerClick="toggleSidebarVisibility" />
    <Sidebar :isOpened="isSidebarOpened" />
    <main class="app-content"
          :class="{'full': !isSidebarOpened}"
    >
      <Loader v-if="isLoading"/>
      <div class="app-page" v-else>
        <router-view/>
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record"
                   v-tooltip="'Создать новую запись'"
      >
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/app/Navbar';
  import Sidebar from '@/components/app/Sidebar';
  import messages from '@/utils/messages';

  export default {
    name: "Main",
    components: {
      Navbar,
      Sidebar
    },
    data() {
      return {
        isLoading: true,
        isSidebarOpened: false
      }
    },
    methods: {
      toggleSidebarVisibility() {
        this.isSidebarOpened = !this.isSidebarOpened;
      }
    },
    computed: {
      error() {
        return this.$store.getters.error;
      }
    },
    watch: {
      error(fbError) {
        this.$error(messages[fbError.code] || 'Что-то пошло не так');
      }
    },
    async mounted() {
      if (!Object.keys(this.$store.getters.info).length) {
        await this.$store.dispatch('fetchUser');
      }

      this.isLoading = false;
    }
  }
</script>

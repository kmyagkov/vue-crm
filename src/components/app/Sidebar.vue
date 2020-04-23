<template>
  <ul class="sidenav app-sidenav"
      :class="{'open': isOpened}"
  >
    <router-link v-for="link of links"
                 :key="link.url"
                 tag="li"
                 active-class="active"
                 :to="link.url"
                 :exact="link.isExact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<script>
  export default {
    name: "Sidebar",
    data() {
      return {
        links: [
          {
            title: 'Счет',
            url: '/',
            isExact: true
          },
          {
            title: 'История',
            url: '/history'
          },
          {
            title: 'Планирование',
            url: '/planning'
          },
          {
            title: 'Новая запись',
            url: '/record'
          },
          {
            title: 'Категории',
            url: '/categories'
          },
        ]
      }
    },
    props: {
      isOpened: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

import _ from 'lodash';

export default {
  data() {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 2,
      pageCount: 0,
      items: [],
      shownItems: []
    }
  },
  methods: {
    setupPagination(items) {
      this.items = _.chunk(items, this.pageSize);
      this.pageCount = _.size(this.items);
      this.shownItems = this.items[this.page - 1] || this.items[0];
    },
    onPaginationHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`)
      this.shownItems = this.items[page - 1] || this.items[0];
    }
  }
}

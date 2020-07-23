<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>
    <div class="row">
      <div class="col s6">
        <Chart
          title="Расходы"
        />
      </div>
      <div class="col s6">
        <Chart
          title="Доходы"
        />
      </div>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      Записей пока нет
      <router-link to="/record">Добавьте новую запись</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items" />
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import paginationMixin from "@/mixins/pagination.mixin";
import HistoryTable from "@/components/HistoryTable";
import Chart from "@/components/Chart";

export default {
  name: "history",
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
    categories: [],
  }),
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");
    this.categories = await this.$store.dispatch("fetchCategories");
    this.setup(this.categories);
    this.loading = false;
  },
  methods: {
    setup(categories) {
      this.setupPagination(
        this.records.map(record => {
          return {
            ...record,
            categoryName: categories.find(c => c.id === record.categoryId)
              .title,
            typeClass: record.type === "income" ? "green" : "red",
            typeText: record.type === "income" ? "Доход" : "Расход"
          };
        })
      );
    }
  },
  components: {
    HistoryTable,
    Chart
  }
};
</script>
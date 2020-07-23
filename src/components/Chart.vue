 <template>
  <div class="history-chart">
    <p class="center">{{title}}</p>
    <canvas ref="canvas"></canvas>
  </div>
</template>



<script>
import { Pie } from "vue-chartjs";
export default {
  extends: Pie,
  props: { title: String },
  data: () => ({
    a: [],
    outcome_categories: [],
    income_categories: [],
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.records = await this.$store.dispatch("fetchRecords");
    // if (this.title === "Расходы") {
    //   this.outcome_categories = this.records.filter(function(r){if (r.type === "outcome") return r.categoryId});
    // } else {
    //   this.income_categories =  this.records.filter(function(r){if (r.type === "income") return r.categoryId});
    // }
    this.renderChart({
      labels: this.categories.map(c => c.title),
      datasets: [
        {
          label: "Расходы по категориям",
          data:
            this.title === "Расходы"
              ? this.categories.map(c => {
                  return this.records.reduce((total, r) => {
                    if (r.categoryId === c.id && r.type === "outcome") {
                      total += +r.amount; // '+' приведение к integer
                    }
                    return total;
                  }, 0);
                })
              : this.categories.map(c => {
                  return this.records.reduce((total, r) => {
                    if (r.categoryId === c.id && r.type === "income") {
                      total += +r.amount; // '+' приведение к integer
                    }
                    return total;
                  }, 0);
                }),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    });
  }
};
</script>
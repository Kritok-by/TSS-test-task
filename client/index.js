const app = new Vue({
  el: '#app',
  data: {
    checked: false,
    value: '',
    words: [],
    loading: false,
  },
  computed: {
    isDisabled() {
      return !this.value;
    },
    itChecked() {
      return this.checked;
    },
  },
  methods: {
    async searchWords(e) {
      const dataSet = e.target.dataset.id;
      try {
        this.loading = true;
        const res = await fetch('https://tss-test-server-app.herokuapp.com/');
        console.log(res);
        const data = await res.json();
        console.log(data);
        this.loading = false;
        if (dataSet === 'len' && !isNaN(+this.value)) {
          this.words = [...data.data.filter((i) => i.length > +this.value)];
          this.value = '';
        } else if (dataSet === 'sub') {
          this.checked
            ? (this.words = [
                ...data.data.filter((i) => i.includes(this.value)),
              ])
            : (this.words = [
                ...data.data.filter((i) =>
                  i.toUpperCase().includes(this.value.toUpperCase())
                ),
              ]);
          this.value = '';
          this.checked = false;
        } else {
          this.value = '';
          this.checked = false;
          this.words = [];
        }
      } catch (e) {
        throw new Error(e);
      }
    },
    inputValue(e) {
      this.value = e.target.value;
    },
    isChecked(e) {
      this.checked = e.target.checked;
    },
  },
});

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
        const res = await fetch('http://localhost:3000/');
        const data = await res.json();
        this.loading = false;
        if (dataSet === 'len' && !isNaN(+this.value)) {
          this.words = [...data.data.filter((i) => i.length > +this.value)];
          this.value = '';
        } else if (dataSet === 'sub') {
          this.checked
            ? (this.words = [
                ...data.data.filter((i) =>
                  i.toUpperCase().includes(this.value.toUpperCase())
                ),
              ])
            : (this.words = [
                ...data.data.filter((i) => i.includes(this.value)),
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


const app = new Vue({
    el: '#app',
	data: {
            designers: []
		},
	mounted() {
		axios.get(url).then(response => {
			console.log(response);
			this.designers = response.data.content;
		})}
	}
);

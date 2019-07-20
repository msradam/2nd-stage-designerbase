const Designer = Vue.component('designer', {
    props: ['first_name', 'last_name'],
    template: '<div class="tweet"><h3>{{ first_name }}</h3><p>{{ last_name }}</p></div>'
});

<template>
	<v-footer
		color="blue-grey lighten-3"
		app
	>
		<span class="white--text">&copy; https://github.com/JuliettKhar</span>
	</v-footer>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        name: "Footer",
    })

    export default class Footer extends Vue {
    }
</script>

<style scoped>

</style>

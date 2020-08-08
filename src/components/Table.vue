<template>
	<v-col>
		<v-data-table
			:headers="headers"
			:items="users"
			:page.sync="page"
			:items-per-page="itemsPerPage"
			hide-default-footer
			class="elevation-1"
			:loading="isLoading"
			loading-text="Loading... Please wait"
			@page-count="pageCount = $event"
			@dblclick:row="onDblClick"
		>
		</v-data-table>
		<v-pagination v-model="page" :length="pageCount"></v-pagination>
	</v-col>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator';
    import {User} from "@/types/user";

    @Component({
        name: "Table",
    })

    export default class Table extends Vue {
        @Prop() users!: User[]

        private itemsPerPage = 5
        private page = 1
        private pageCount = 0
        private isLoading = false
        private headers = [
            {text: 'Фамилия ', value: 'lastName'},
            {text: 'Имя ', value: 'firstName'},
            {text: 'Подразделение ', value: 'department'},
            {text: 'Дата регистрации ', value: 'createdAt'},
        ];

        private onDblClick(value: any, {item}: any): void {
            this.$router.push({name: 'edit', params: {id: item.id}})
        }
    }
</script>

<style scoped>

</style>

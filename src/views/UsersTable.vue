<template>
	<v-container>
		<v-row justify="space-between">
			<Filters @search="searchUsers" @clear="clearSearch" :filters="filters"/>
		</v-row>
		<v-row>
			<Table :users="users"/>
		</v-row>
	</v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {User} from "@/types/user";
    import moment from 'moment';
    import Table from "@/components/Table.vue";
    import Filters from "@/components/Filters.vue";

    @Component({
        name: "UsersTable",
        components: {
            Table,
            Filters,
        },
        methods: {
            moment
        },
    })
    export default class UsersTable extends Vue {
        private filters = {
            date: [
                moment().subtract(1, 'day').format('YYYY-MM-DD'),
                moment().format('YYYY-MM-DD'),
            ],
            lastName: ''
        }
        private isLoading = false

        get users(): User[] {
            return this.$store.state.users
        }

        private getUsersList(): void {
            this.isLoading = false
            Promise.resolve(this.$store.dispatch('getUsers')).then(() => this.isLoading = false)
        }
        private clearSearch(): void {
            this.$store.dispatch('getUsers')
            this.filters.lastName = ''
        }
        private searchUsers(): void {
            const start = +moment(this.filters.date[0])
            const end = +moment(this.filters.date[1])
            const {lastName} = this.filters
            const filteredUsers: User[] = []
            this.users.filter((user: User) => {
                if (user.lastName.toLowerCase().includes(lastName.toLowerCase()) &&
                    (start <= +moment(user.createdAt) || end <= +moment(user.createdAt))
                ) {
                    filteredUsers.push(user)
                }
            })
            this.$store.commit('SET_USERS', filteredUsers)
        }

        mounted() {
            this.getUsersList()
        }
    }
</script>

<style scoped>

</style>

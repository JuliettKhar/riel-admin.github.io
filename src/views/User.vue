<template>
	<v-form ref="form">
		<v-text-field
			v-model="formData.lastName"
			label="Фамилия"
			required
		></v-text-field>

		<v-text-field
			v-model="formData.firstName"
			label="Имя "
			required
		></v-text-field>

		<v-autocomplete
			v-model="formData.department"
			:items="departments"
			:filter="customFilter"
			background-color="white"
			item-text="name"
			dense
			filled
			label="Подразделение"
		>
		</v-autocomplete>

		<v-btn
			v-if="!isCreate"
			color="warning"
			class="mr-4"
			outlined
			@click="updateUserData"
		>
			Редактировать
		</v-btn>
		<v-btn
			v-if="!isCreate"
			color="error"
			class="mr-4"
			outlined
			@click="handleRemoveUser"
		>
			Удалить
		</v-btn>
		<v-btn
			v-if="isCreate"
			color="success"
			outlined
			class="mr-4"
			@click="createNewUser"
		>
			Добавить
		</v-btn>
	</v-form>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Department} from "@/types/department";
    import {User} from "@/types/user";
    import moment from "moment";

    @Component({
        name: "NewUser",
        methods: {
            moment
        }
    })


    export default class NewUser extends Vue {
        private formData: User = {
            firstName: '',
            lastName: '',
            department: '',
            createdAt: moment().format('YYYY-MM-DD'),
        }

        get departments(): Department[] {
            return this.$store.state.departments
        }

        get user(): User {
            return this.$store.state.user
        }

        get users(): User[] {
            return this.$store.state.users
        }

        get isCreate(): boolean {
            return this.$route.name === 'create'
        }


        private getListOfDepartments(): void {
            this.$store.dispatch('getDepartments')
        }

        private createNewUser(): void {
            const {department, createdAt, ...data} = this.formData
            const guid = this.generateGUID()

            this.$store.dispatch('createUser', {
                ...data,
                department,
                createdAt: moment(createdAt).format('YYYY-MM-DD'),
                guid,
            })
            this.$router.push({name: 'users'})
        }

        private generateGUID(): string {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
                .replace(/[xy]/g, (c) => {
                    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
        }

        private async getUserData(): Promise<void> {
            if (this.$route.params.id) {
                await this.$store.dispatch('getUserById', this.$route.params.id)
                this.formData = this.user
            }
        }

        private async updateUserData(): Promise<void> {
            const {id} = this.$route.params
            try {
                await this.$store.dispatch('updateUser', {
                    id,
                    ...this.formData
                })
                await this.$router.push({name: 'users'})
            } catch (e) {
                await this.$alert(e.error.message)
            }

        }

        private handleRemoveUser(): void {
            this.$confirm("Удалить пользователя?")
                .then(() => {
                    this.deleteUser()
                })
                .catch((r) => {
                    console.log(r)
                })
        }

        private async deleteUser(): Promise<void> {
            try {
                await this.$store.dispatch('deleteUser', this.$route.params.id)
                await this.$router.push({name: 'users'})
            } catch (e) {
                await this.$alert(e.error.message)
            }

        }

        private customFilter(queryText: { name: string }): User[] {
            return this.users.filter((user: User) => {
                return user.department.indexOf(queryText.name) > -1
            })
        }


        mounted(): void {
            this.getListOfDepartments()
            this.getUserData()
        }
    }
</script>

<style scoped lang="scss">
	form {
		max-width: 50%;
		margin: 0 auto;
	}

</style>

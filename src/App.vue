<template>
	<div id="app">
		<v-app id="inspire">
			<v-app id="inspire">
				<v-navigation-drawer
					v-model="drawer"
					app
				>
					<v-list dense>
						<v-list-item link>
							<v-list-item-action>
								<v-icon>fas fa-edit</v-icon>
							</v-list-item-action>
							<v-list-item-content>
								<v-list-item-title>
									<router-link :to="{name: 'create'}" class="nav__link">Новый риэлтор</router-link>
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
						<v-list-item link>
							<v-list-item-action>
								<v-icon>fas fa-list</v-icon>
							</v-list-item-action>
							<v-list-item-content>
								<v-list-item-title>
									<router-link :to="{name: 'users'}" class="nav__link">Список риэлторов</router-link>
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
						<v-list-item>
							<v-list-item-content>
								<v-form>
									<v-container>
										<v-row>
											<v-col>
												<v-text-field
													v-model.trim="searchQuery"
													label="Поиск"
													required
													append-icon="close"
													@click:append="clearSearch"
												></v-text-field>
											</v-col>
										</v-row>
										<v-row>
											<v-list-item>
												<v-btn
													color="warning"
													outlined
													@click.prevent="onSearchClick"
												>
													Поиск
												</v-btn>
											</v-list-item>
										</v-row>
									</v-container>
								</v-form>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-navigation-drawer>
				<v-app-bar
					app
					color="blue-grey lighten-3"
					dark
				>
					<v-app-bar-nav-icon @click="drawer =!drawer"></v-app-bar-nav-icon>
					<v-toolbar-title>Company name</v-toolbar-title>
				</v-app-bar>
				<v-main>
					<v-container fluid>
						<v-row align="start" justify="center">
							<v-col class="text-center">
								<router-view/>
							</v-col>
						</v-row>
					</v-container>
				</v-main>
				<Footer/>
			</v-app>
		</v-app>
	</div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Footer from "@/components/Footer.vue";
    import {User} from "@/types/user";

    @Component({
        name: "App",
        components: {
            Footer,
        }
    })

    export default class App extends Vue {
        private drawer = null

        private searchQuery = ''

        get users(): User[] {
            return this.$store.state.users
        }

        private onSearchClick(): void {
            if (this.$route.name !== 'users') {
                this.$router.push({name: 'users', query: {qs: this.searchQuery.toLowerCase()}})
            }
            this.$router.replace({
                name: 'users',
                query: {qs: this.searchQuery.toLowerCase()}
            }).catch(err => {
                console.log(err)
            })

            setTimeout(() => {
                const filteredUsers: User[] = []

                this.users.filter((user: User) => {
                    if (user.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                        user.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                        user.department.toLowerCase().includes(this.searchQuery.toLowerCase())) {
                        filteredUsers.push(user)
                    }
                })

                this.$store.commit('SET_USERS', filteredUsers)
            }, 1000)
        }

        clearSearch(): void {
            this.searchQuery = ''
            this.$router.push({query: {qs: ''}})
            this.$store.dispatch('getUsers')
        }
    }
</script>

<style lang="scss">
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}

	.v-list-item__title {
		text-align: start;
	}

	.v-application a {
		color: #000 !important;
		text-decoration: none;
	}
</style>

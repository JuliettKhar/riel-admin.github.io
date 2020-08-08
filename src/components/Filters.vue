<template>
	<v-col>
		<v-form ref="form">
			<v-container>
				<v-row align="center">
					<v-col cols="12" md="5">
						<v-text-field
							v-model.trim="filters.lastName"
							append-icon="close"
							label="Фамилия"
							@click:append="$emit('clear')"
						></v-text-field>
					</v-col>
					<v-col cols="12" md="5">
						<v-menu
							ref="menu"
							v-model="menu"
							:close-on-content-click="false"
							:return-value.sync="filters.date"
							transition="scale-transition"
							offset-y
							min-width="290px"
						>
							<template v-slot:activator="{ on, attrs }">
								<v-combobox
									v-model="filters.date"
									multiple
									chips
									small-chips
									label="Дата регистрации"
									prepend-icon="event"
									readonly
									v-bind="attrs"
									v-on="on"
								></v-combobox>
							</template>
							<v-date-picker v-model="filters.date" multiple no-title scrollable>
								<v-spacer></v-spacer>
								<v-btn text color="primary" @click="menu = false">Cancel</v-btn>
								<v-btn text color="primary" @click="$refs.menu.save(filters.date)">OK</v-btn>
							</v-date-picker>
						</v-menu>
					</v-col>
					<v-col cols="12" md="2">
						<v-btn
							color="warning"
							class="mr-4"
							outlined
							@click="$emit('search')"
						>
							Поиск
						</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</v-form>
	</v-col>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator';
    import {UserFilters} from "@/types/filters";

    @Component({
        name: "Filters",
    })
    export default class Filters extends Vue {
        @Prop() filters!: UserFilters

        private menu = false;
    }
</script>

<style scoped>

</style>

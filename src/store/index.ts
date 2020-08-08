import Vue from 'vue'
import Vuex from 'vuex'
import {User} from "@/types/user";
import firebase from "@/plugins/firebaseConfig";
import {Department} from "@/types/department";

Vue.use(Vuex)
const db = firebase.firestore();

export default new Vuex.Store({
    state: {
        users: [],
        departments: [],
        user: {}
    },
    mutations: {
        SET_USERS(state, users) {
            state.users = users
        },
        SET_USER(state, user) {
            state.user = user
        },
        SET_DEPARTMENTS(state, departments) {
            state.departments = departments
        },
    },
    actions: {
        async getUsers({commit}): Promise<any> {
            try {
                const querySnapshot = await db.collection("users").get()
                const users: User[] = []
                querySnapshot.forEach((doc) => {
                    const {createdAt, department, firstName, guid, lastName} = doc.data()
                    users.push({
                        createdAt,
                        department,
                        firstName,
                        guid,
                        lastName,
                        id: doc.id,

                    });
                })
                commit('SET_USERS', users)
            } catch (e) {
                console.log(e)
            }
        },

        async createUser({commit}, payload: User): Promise<void> {
            try {
                await db.collection("users").add(payload)
            } catch (e) {
                console.log(e)
            }
        },

        async getDepartments({commit}): Promise<void> {
            try {
                const querySnapshot = await db.collection("departments").get()
                const departments: Department[] = []
                querySnapshot.forEach((doc) => {
                    const {name} = doc.data()
                    departments.push({name});
                })
                commit('SET_DEPARTMENTS', departments)
            } catch (e) {
                console.log(e)
            }
        },

        async getUserById({commit}, id): Promise<void> {
            try {
                const docRef = await db.collection("users").doc(id).get()
                commit('SET_USER', docRef.data())
            } catch (e) {
                console.log(e)
            }
        },

        async updateUser({commit}, payload): Promise<void> {
            try {
                const {id, ...data} = payload
                await db.collection("users").doc(id).update({...data})
            } catch (e) {
                console.log(e)
            }
        },

        async deleteUser({commit}, id): Promise<void> {
            try {
                await db.collection("users").doc(id).delete()
            } catch (e) {
                console.log(e)
            }
        },
    },
    modules: {}
})

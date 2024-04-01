<template>
    <NavBar />
    <User :users="users" />
</template>

<script>
    import NavBar from "@/components/NavBar.vue";
    import User from "@/components/User.vue";
    import { onBeforeMount, onMounted, ref } from "vue";
    import { useStore } from "vuex";

    export default {
        name: "AdminView",
        components: {
            NavBar,
            User,
        },
        setup() {
            const store = useStore();
            const users = ref({}); // Initialize as an empty object

            onBeforeMount(async () => {
                await store.dispatch("getRooms");

                // Check if store.state.rooms is null or undefined before assigning
                // If it's null or undefined, initialize users.value as an empty object
                users.value = store.state.rooms || {};
                console.log("USERS ", users.value);
            });

            onMounted(() => {
                console.log(process.env.VUE_APP_ADMIN_TOKEN);
            });

            return {
                users,
            };
        },
    };
</script>

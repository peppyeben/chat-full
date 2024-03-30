<template>
    <NavBar />
    <User :users="users" />
</template>

<script>
    import NavBar from "@/components/NavBar.vue";
    import Chat from "@/components/Chat.vue";

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
            const users = ref(null);
            onBeforeMount(async () => {
                await store.dispatch("getRooms");

                users.value = store.state.rooms;
                console.log("USERS ", users.value)
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

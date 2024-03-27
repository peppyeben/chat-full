<template>
    <NavBar />
    <Chat :chatInfo="chatInfo" />
</template>

<script>
    import { useStore } from "vuex";
    import { onMounted, onBeforeMount, ref, reactive } from "vue";
    import { useRouter, useRoute } from "vue-router";
    import NavBar from "@/components/NavBar.vue";
    import Chat from "@/components/Chat.vue";

    import demoData from "@/utils/users";

    export default {
        name: "UserTickets",
        components: {
            NavBar,
            Chat,
        },
        setup() {
            const router = useRouter();
            const route = useRoute();
            const store = useStore();

            const chatInfo = ref();

            onBeforeMount(() => {
                console.log(route.params);

                if (getObjectById(route.params.user) == undefined) {
                    router.push({ name: "users" });
                }

                chatInfo.value = getObjectById(route.params.user);

                console.log(chatInfo.value);
            });

            onMounted(async () => {});

            function getObjectById(id) {
                return demoData.find((item) => item.id == id);
            }
            return {
                chatInfo,
            };
        },
    };
</script>

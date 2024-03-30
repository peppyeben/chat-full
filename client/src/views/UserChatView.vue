<template>
    <NavBar />
    <Chat :userId="userId" />
</template>

<script>
    import { useStore } from "vuex";
    import { onMounted, onBeforeMount, ref, reactive, computed } from "vue";
    import { useRouter, useRoute } from "vue-router";
    import NavBar from "@/components/NavBar.vue";
    import Chat from "@/components/Chat.vue";

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

            const userId = ref(null);

            const previousPage = computed(() => {
                const lastPath = router.options.history.state.back;
                return lastPath ? lastPath : "/";
            });

            onBeforeMount(() => {
                console.log(route.params);

                const userObject = {};

                if (route.params.user == undefined) {
                    router.push({ name: "users" });
                }

                // console.log(previousPage())
                console.log(previousPage.value.split("/"));
                if (previousPage.value.split("/")[1] == "admin-chat") {
                    console.log(route.params.user);
                    userObject.sender_id = "ADMIN";
                    userObject.id = route.params.user;
                    userId.value = userObject;
                    // userId.value = route.params.user;
                } else {
                    if (!localStorage.getItem("userId")) {
                        userObject.sender_id = generateUniqueId();
                        userObject.id = generateUniqueId();
                        userId.value = userObject;

                        // userId.value = generateUniqueId();
                        localStorage.setItem("userId", userId);
                    } else {
                        userObject.sender_id = localStorage.getItem("userId");
                        userObject.id = localStorage.getItem("userId");
                        userId.value = userObject;

                        // userId.value = localStorage.getItem("userId");
                    }
                }
            });

            onMounted(async () => {});

            function generateUniqueId() {
                return Math.random().toString(36).substr(2, 9);
            }

            return {
                userId,
            };
        },
    };
</script>

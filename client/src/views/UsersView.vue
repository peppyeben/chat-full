<template>
    <NavBar />
    <Chat :userId="userId" />
</template>

<script>
    import NavBar from "@/components/NavBar.vue";
    import User from "@/components/User.vue";
    import Chat from "@/components/Chat.vue";

    import { onMounted, onBeforeMount, ref, reactive, computed } from "vue";

    export default {
        name: "ChatsView",
        components: {
            NavBar,
            Chat,
            User,
        },
        setup() {
            const userId = ref(null);

            onBeforeMount(() => {
                const userObject = {};
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
            });

            function generateUniqueId() {
                return Math.random().toString(36).substr(2, 9);
            }

            return {
                userId,
            };
        },
    };
</script>

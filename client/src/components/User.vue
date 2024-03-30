<template>
    <div class="lg:container flex flex-col justify-center items-center mx-auto">
        <div
            v-for="(user, index) in users"
            :key="index"
            class="flex flex-row justify-between items-center rounded-none w-full bg-white py-2 px-6 text-surface shadow-secondary-1"
        >
            <h5 class="text-sm font-medium leading-tight">{{ user.id }}</h5>
            <p class="text-sm">
                <!-- {{ user.email }} -->
                {{ user._id }}
            </p>
            <EnvelopeIcon
                @click="routeToAdminChat(user.name)"
                class="h-6 w-6 text-blue-500 cursor-pointer hover:text-blue-600"
            />
        </div>
    </div>
</template>
<script>
    import { ref, onMounted, onBeforeMount } from "vue";

    import { useStore } from "vuex";
    import { useRouter, useRoute } from "vue-router";

    import { Ripple, initTWE } from "tw-elements";
    import { EnvelopeIcon } from "@heroicons/vue/24/solid";

    import demoData from "@/utils/users";

    export default {
        name: "User",
        components: {
            EnvelopeIcon,
        },
        props: {
            users: {
                type: Object,
                required: true,
            },
        },
        setup(props) {
            const router = useRouter();
            const store = useStore();

            const users = ref([]);
            onBeforeMount(async () => {
                await store.dispatch("getRooms");

                users.value = props.users;
            });
            onMounted(() => {
                initTWE({ Ripple });

                // users.value = demoData;

                console.log(demoData);
            });

            const routeToAdminChat = (x) => {
                router.push({ name: "admin-user-chat", params: { user: x } });
            };

            return {
                users,
                routeToAdminChat,
            };
        },
    };
</script>

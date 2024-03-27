<template>
    <div class="lg:container flex flex-col justify-center items-center mx-auto">
        <div
            v-for="(user, index) in users"
            :key="index"
            class="flex flex-row justify-between items-center rounded-none w-full bg-white py-2 px-6 text-surface shadow-secondary-1"
        >
            <h5 class="text-sm font-medium leading-tight">{{ user.id }}</h5>
            <p class="text-sm">
                {{ user.email }}
            </p>
            <EnvelopeIcon
                @click="routeToUserChat(user.id)"
                class="h-6 w-6 text-blue-500 cursor-pointer hover:text-blue-600"
            />
        </div>
    </div>
</template>
<script>
    import { ref, onMounted } from "vue";

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
        setup() {
            const router = useRouter();

            const users = ref([]);
            onMounted(() => {
                initTWE({ Ripple });

                users.value = demoData;

                console.log(demoData);
            });

            const routeToUserChat = (x) => {
                router.push({ name: "user-chat", params: { user: x } });
            };

            return {
                users,
                routeToUserChat,
            };
        },
    };
</script>

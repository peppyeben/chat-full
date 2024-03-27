<template>
    <div class="lg:container flex flex-col justify-center items-center mx-auto">

        <div v-for="(user, index) in users" :key="index"
            class="flex flex-row justify-between items-center rounded-none w-full bg-white py-2 px-6 text-surface shadow-secondary-1">
            <h5 class="text-sm font-medium leading-tight">{{ user.id }}</h5>
            <p class="text-sm">
                {{ user.email }} </p>
            <!-- <button type="button"
                class="rounded bg-primary p-2 text-sm font-medium leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 "
                data-twe-ripple-init data-twe-ripple-color="light">
                button
            </button> -->
            <EnvelopeIcon class="h-6 w-6 text-blue-500 cursor-pointer hover:text-blue-600" />
        </div>
    </div>
</template>
<script>
import { ref, onMounted } from "vue";
import demoData from "@/utils/users"

import { EnvelopeIcon } from '@heroicons/vue/24/solid'


import { useStore } from "vuex";

import {
    Ripple,
    initTWE,
} from "tw-elements";


export default {
    name: "User",
    components: {
        EnvelopeIcon
    },
    setup() {
        const users = ref([]);
        onMounted(() => {
            initTWE({ Ripple });

            users.value = demoData

            console.log(demoData)
        });

        return {
            users
        }
    }

}

</script>
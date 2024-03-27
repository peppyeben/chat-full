<template>
    <!-- Main navigation container -->
    <nav
        class="flex-no-wrap relative flex w-full items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-700 lg:flex-wrap lg:justify-start lg:py-4">
        <div class="flex w-full flex-wrap items-center justify-between px-3">
            <!-- Hamburger button for mobile view -->
            <button
                class="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
                type="button" data-twe-collapse-init data-twe-target="#navbarSupportedContent1"
                aria-controls="navbarSupportedContent1" aria-expanded="false" aria-label="Toggle navigation">
                <!-- Hamburger icon -->
                <span class="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                            clip-rule="evenodd" />
                    </svg>
                </span>
            </button>

            <!-- Collapsible navigation container -->
            <div class="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
                id="navbarSupportedContent1" data-twe-collapse-item>
                <!-- Left navigation links -->
                <ul class="list-style-none me-auto flex flex-col py-2 ps-0 lg:flex-row" data-twe-navbar-nav-ref>
                    <li class="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>

                        <router-link
                            class="block mt-4 lg:inline-block lg:mt-0 text-indigo-800 hover:text-indigo-400 mr-4"
                            :to="{ name: 'home' }">
                            Home
                        </router-link>
                    </li>
                    <!-- Team link -->
                    <li class="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
                        <router-link
                            class="block mt-4 lg:inline-block lg:mt-0 text-indigo-800 hover:text-indigo-400 mr-4"
                            :to="{ name: 'users' }">
                            Users
                        </router-link>
                    </li>
                </ul>
                <!-- Left links -->
            </div>

        </div>
    </nav>

</template>
<script>

import { ref, onMounted } from "vue";
import { useStore } from "vuex";

import {
    Collapse,
    Dropdown,
    initTWE,
} from "tw-elements";


export default {
    name: "NavBar",
    setup() {
        onMounted(() => {
            initTWE({ Collapse, Dropdown });
        });
    }

}
</script>
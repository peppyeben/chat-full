<template>
    <main
        class="h-screen overflow-hidden flex items-center justify-center"
        style="background: #edf2f7"
    >
        <div class="flex h-screen antialiased text-gray-800">
            <div class="flex flex-col flex-auto h-full p-6">
                <div
                    class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full"
                >
                    <div class="flex flex-col h-full overflow-x-auto mb-4">
                        <div class="flex flex-col h-full space-y-2 p-2">
                            <div
                                v-for="(message, i) in chatInfo.chats"
                                class="grid grid-cols-12 gap-y-2"
                            >
                                <div
                                    v-if="message.sender_id != 0"
                                    class="col-start-1 col-end-8 rounded-lg"
                                >
                                    <div class="flex flex-row items-center">
                                        <div
                                            class="flex items-center justify-center h-6 w-6 rounded-full text-indigo-700 flex-shrink-0"
                                        >
                                            A
                                        </div>
                                        <div
                                            class="relative ml-3 text-sm bg-white py-2 px-2 shadow rounded-xl"
                                        >
                                            <div>{{ message.content }}</div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    v-else
                                    class="col-start-6 col-end-13 rounded-lg"
                                >
                                    <div
                                        class="flex items-center justify-start flex-row-reverse"
                                    >
                                        <div
                                            class="flex items-center justify-center text-white h-6 w-6 rounded-full bg-indigo-500 flex-shrink-0"
                                        >
                                            B
                                        </div>
                                        <div
                                            class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                                        >
                                            <div>{{ message.content }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
                    >
                        <div>
                            <button
                                class="flex items-center justify-center text-gray-400 hover:text-gray-600"
                            >
                                <svg
                                    class="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        <div class="flex-grow ml-4">
                            <div class="relative w-full">
                                <input
                                    type="text"
                                    class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                />
                                <button
                                    class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                                >
                                    <svg
                                        class="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="ml-4">
                            <button
                                class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                            >
                                <span>Send</span>
                                <span class="ml-2">
                                    <svg
                                        class="w-4 h-4 transform rotate-45 -mt-px"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                        ></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import { ref, onBeforeMount } from "vue";

    export default {
        name: "Chat",
        props: {
            chatInfo: {
                type: Object,
                // required: true,
            },
        },
        setup(props) {
            const chatInfo = ref(props.chatInfo);
            const isDropdownHidden = ref(true);

            onBeforeMount(() => {
                console.log(chatInfo.value);
            });

            const toggleDropdown = () => {
                isDropdownHidden.value = !isDropdownHidden.value;
            };

            return {
                chatInfo,
                toggleDropdown,
                isDropdownHidden,
            };
        },
    };
</script>

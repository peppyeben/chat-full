<template>
  <NavBar />
  <User />

</template>

<script>
import NavBar from "@/components/NavBar.vue";
import User from "@/components/User.vue";

export default {
  name: "ChatsView",
  components: {
    NavBar,
    User
  },
};
</script>
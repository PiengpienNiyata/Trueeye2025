<template>
    <MainBody>
    <template v-slot:maincomponent>
    <div class="w-full h-full  p-5  bg-[#EFEFEF] select-none overflow-scroll">
        <TestCenter/>
    </div>
</template>
    </MainBody>
</template>
<script setup>
import MainBody from "../MainBody.vue";
import TestCenter from "./TestMain.vue";

</script>

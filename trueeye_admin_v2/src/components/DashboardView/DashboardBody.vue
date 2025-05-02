<template>
    <MainBody>
    <template v-slot:maincomponent>
    <div class="w-full h-full  p-5  bg-[#EFEFEF] select-none overflow-scroll">
        <HeadComp/>
        <div class="flex flex-col md:flex-row py-4 scroll-auto">
            <div class="grid gap-4 flex-1 w-[70%] mx-auto pr-4">
                <CompareYearChart/>
                <OnlineStatus/>
            </div>
            <div>
                <CompareHospital/>
            </div>
            
        </div>
    </div>
</template>
    </MainBody>
</template>
<script setup>
import MainBody from "@/components/MainBody.vue";
import HeadComp from "./HeadComp.vue";
import CompareHospital from "./CompareHospital.vue";
import CompareYearChart from "./CompareYearChart.vue";
import OnlineStatus from "./OnlineStatus.vue";


</script>

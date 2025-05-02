<template>
  <div class="w-full p-4 rounded-lg shadow-md bg-white">
    <div class="flex justify-between text-sm">
      <span>{{ credit.siteName }}</span>
    </div>

    <div class="flex justify-between text-sm mt-1">
      <span>ชื่อผู้รับผิดชอบ</span>
      <span>{{ credit.responsiblePerson }}</span>
    </div>

    <div class="flex justify-between text-sm mt-1">
      <span>Username</span>
      <span>{{ credit.username }}</span>
    </div>

    <div class="flex justify-between text-sm mt-1">
      <span>วันที่เริ่มต้น</span>
      <span>{{ credit.startDate }}</span>
    </div>

    <div class="flex justify-between text-sm mt-1">
      <span>วันที่สิ้นสุด</span>
      <span>{{ credit.endDate }}</span>
    </div>

    <div class="text-sm text-gray-400 mt-3">สิทธิ์การใช้งาน</div>

    <div class="flex items-center justify-between mt-1">
      <span :class="statusColorClass">{{ credit.usage }}</span>
      <span :class="iconColorClass">{{ getStatusIcon.value }}</span>
    </div>

    <div class="mt-2 h-2 bg-gray-200 rounded-full w-full">
      <div
        class="h-full rounded-full"
        :style="{
          width: percentUsed.value + '%',
          backgroundColor: progressBarColor,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";

const props = defineProps({
  credit: {
    type: Object,
    required: true,
  },
});

const percentUsed = computed(() =>
  Math.min(100, Math.round((props.credit.usage / props.credit.max) * 100))
);

const getStatusColor = computed(() => {
  if (percentUsed.value >= 90) return "green";
  if (percentUsed.value >= 50) return "yellow";
  return "red";
});

const getStatusIcon = computed(() => {
  const icons = {
    green: "✔️",
    yellow: "⚠️",
    red: "❌",
  };
  return icons[getStatusColor.value] || "❓";
});

const statusColorClass = computed(() => `font-bold text-${getStatusColor.value}-600`);
const iconColorClass = computed(() => `text-${getStatusColor.value}-500`);

const progressBarColor = computed(() => {
  if (getStatusColor.value === "green") return "#22C55E";
  if (getStatusColor.value === "yellow") return "#FBBF24";
  return "#DC2626";
});
</script>

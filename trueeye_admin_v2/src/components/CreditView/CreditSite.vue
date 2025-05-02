<template>
  <div>
    <CreditFilterBar />

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-4">
      <CreditItem v-for="(item, index) in creditItems" :key="index" :credit="item" />
    </div>
  </div>
</template>

<script setup>
import CreditFilterBar from "./CreditFilterBar.vue";
import CreditItem from "./CreditItem.vue";

//mockไว้ก่อน
const creditItems = [
  {
    siteName: "Site A",
    responsiblePerson: "นาย A",
    username: "a_001",
    startDate: "01/01/2025",
    endDate: "01/12/2025",
    usage: 5000,
    max: 5000,
  },
  {
    siteName: "Site B",
    responsiblePerson: "นาย B",
    username: "b_001",
    startDate: "01/01/2025",
    endDate: "01/12/2025",
    usage: 2200,
    max: 5000,
  },
  {
    siteName: "Site C",
    responsiblePerson: "นาย C",
    username: "c_001",
    startDate: "01/01/2025",
    endDate: "01/12/2025",
    usage: 100,
    max: 5000,
  },
  {
    siteName: "Site D",
    responsiblePerson: "นาย D",
    username: "d_001",
    startDate: "01/01/2025",
    endDate: "01/12/2025",
    usage: 0,
    max: 5000,
  },
  {
    siteName: "Site E",
    responsiblePerson: "นาย E",
    username: "e_001",
    startDate: "01/01/2025",
    endDate: "01/12/2025",
    usage: 4100,
    max: 5000,
  },
];
</script>

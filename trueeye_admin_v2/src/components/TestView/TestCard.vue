<template>
  <div
    class="bg-white"
    :class="['p-4 m-2 border rounded shadow', isDraggable ? 'cursor-move' : 'cursor-not-allowed']"
    :draggable="isDraggable"
    @dragstart="handleDrag"
  >
    <p class="text-gray-800 font-bold">{{ testCaseName.name }}</p>
    <p class="text-gray-500 text-sm">{{ testCaseName.description || '' }}</p>
    <div class="flex justify-between mt-2">
      <p class="text-gray-500 text-sm">
  {{ testCaseName.time ? `${testCaseName.time.toFixed(1)}s` : '-' }}
</p>
      <p
        :class="testCaseName.status === 'Pass' ? 'text-green-500' : testCaseName.status === 'Fail' ? 'text-red-500' : 'text-gray-500'"
      >
        {{ testCaseName.status || 'N/A' }}
      </p>
    </div>
    <div v-if="testCaseName.error" class="text-red-500 text-xs mt-1">
      {{ testCaseName.error }}
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  testCaseName: {
    type: Object,
    required: true
  }
})

// ✅ ห้าม drag login
const isDraggable = computed(() => props.testCaseName.name !== 'Login')

function handleDrag(event) {
  if (!isDraggable.value) {
    event.preventDefault()
    return
  }

  event.dataTransfer.setData('text/plain', props.testCaseName.name)
  event.dataTransfer.effectAllowed = 'move'
}
</script>

<style scoped>
</style>

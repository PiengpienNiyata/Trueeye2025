<template>
  <div class="flex justify-around bg-white h-full p-8 w-full rounded">
    <!-- Automation Form -->
    <div class="automation-runner bg-neutral-100 p-8 rounded shadow ">
      <h1 class="text-2xl font-bold mb-4">Run Automation</h1>
      <form @submit.prevent="runAutomation" class="space-y-4">
        <div>
          <label for="username" class="block font-medium">Username:</label>
          <input
            v-model="username"
            id="username"
            type="text"
            required
            class="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label for="password" class="block font-medium">Password:</label>
          <input
            v-model="password"
            id="password"
            type="password"
            requiredfds
            class="border rounded p-2 w-full"
          />
        </div>
         <div class="w-[220px]">
    <div class="inline-flex flex-wrap items-center gap-2">
      <span
        v-for="(item, index) in items"
        :key="index"
        class="text-gray-700 rounded-full bg-white py-2 px-3 cursor-pointer"
        @click="handleClick(item)"
      >
        {{ item.name }}
      </span>
    </div>
  </div>
        <button
          type="submit"
          :disabled="loading"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 float-end"
        >
          {{ loading ? "Running..." : "Run Automation" }}
        </button>
      </form>
    </div>

    <!-- Use Zone -->
    <div
      class="w-5/12 min-h-[200px] border-2 border-dashed border-gray-300 p-4 ml-4 rounded bg-green-100 overflow-x-scroll"
      @dragover.prevent
      @drop="handleDrop('use', $event)"
    >
      <h3 class="text-xl font-semibold text-green-800 mb-4">Use</h3>
      <div>
        <CardComponent
          v-for="(card, index) in useCards"
          :key="index"
          :testCaseName="card"
        />
      </div>
    </div>

    <!-- No Use Zone -->
    <div
      class="w-5/12 min-h-[200px] border-2 border-dashed border-gray-300 p-4 ml-4 rounded bg-red-100 overflow-x-scroll"
      @dragover.prevent
      @drop="handleDrop('noUse', $event)"
    >
      <h3 class="text-xl font-semibold text-red-800 mb-4">No Use</h3>
      <div>
        <CardComponent
          v-for="(card, index) in noUseCards"
          :key="index"
          :testCaseName="card"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import CardComponent from './TestCard.vue'

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)
const items = [{name: "New Account", case:[0,1,4,3,4,5]},{name: "Recheck", case:[0,1,4,5]},{name: "Update Function", case:[0,1,2,5]}]

// ✅ Initial test cards
const useCards = ref([
  {no:0, name: 'Login',description: 'Login testing' , status: null, error: null }
])

const noUseCards = ref([
  {no:1, name: 'Batch Upload',description: 'Batch file' , status: null, error: null },
  {no:2, name: 'Single Upload',description: 'Single file' , status: null, error: null },
  {no:3, name: 'Table ',description: 'Batch file' , status: null, error: null },
  {no:4, name: 'Search',description: 'Batch file' , status: null, error: null },
  {no:5, name: 'Date Fitter',description: 'Batch file' , status: null, error: null },
])

function handleDrop(zone, event) {
  const name = event.dataTransfer.getData('text/plain')

  // หาว่า drag มาจาก use หรือ noUse
  let dragged =
    useCards.value.find(item => item.name === name) ||
    noUseCards.value.find(item => item.name === name)

  if (!dragged) return

  useCards.value = useCards.value.filter(item => item.name !== name)
  noUseCards.value = noUseCards.value.filter(item => item.name !== name)

  if (zone === 'use') {
    useCards.value.push(dragged)
  } else {
    noUseCards.value.push(dragged)
  }
}

function handleClick(item) {
  if (typeof item === "object" && Array.isArray(item.case)) {
    console.log('Selected item has test cases:', item.case)
    const selectedNos = item.case
    const allCards = [...useCards.value, ...noUseCards.value]
    const use = []
    const noUse = []

    allCards.forEach(card => {
      if (selectedNos.includes(card.no)) {
        use.push(card)
      } else {
        noUse.push(card)
      }
    })
    useCards.value = use
    noUseCards.value = noUse
  } else {
    console.log("Does not have test cases.")
  }
}

async function runAutomation() {
  loading.value = true
  error.value = null

  // ตั้งสถานะ Testing ทั้งหมดก่อน
  useCards.value = useCards.value.map(card => ({
    ...card,
    status: 'Testing',
    error: null
  }))

  try {
    const response = await axios.post('http://localhost:3000/run-automation', {
      username: username.value,
      password: password.value,
      tests: useCards.value.map(t => t.name)
    })

    const results = response.data.tests
    useCards.value = useCards.value.map(card => {
      const result = results.find(r => r.name === card.name)
      return result ? { ...card, ...result } : card
    })

  } catch (err) {
    error.value = err.response ? err.response.data.error : err.message
  }

  // reset noUseCards
  noUseCards.value = noUseCards.value.map(card => ({
    ...card,
    status: null,
    error: null
  }))

  loading.value = false
}

</script>

<style scoped>
</style>

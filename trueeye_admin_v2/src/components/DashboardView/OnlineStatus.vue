<template>
  <div class="w-full h-full bg-white py-6 px-4 rounded-lg gap-y-2 shadow-md">
    <div class="border-[#E5E5EF] border-b">
      <div class="flex items-center justify-between pb-2">
        <p class="text-[20px]">สถานะการใช้งาน</p>
        <div class="flex items-center gap-x-6">
         <p class="text-[16px]">ใช้งานอยู่ : 1 จาก 50</p>
          <div class=" flex items-center justify-between gap-1  text-[#A4A4A4]">
            <button :disabled="compState.currentPage <= 1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.71 15.8805L10.83 12.0005L14.71 8.12047C15.1 7.73047 15.1 7.10047 14.71 6.71047C14.32 6.32047 13.69 6.32047 13.3 6.71047L8.70998 11.3005C8.31998 11.6905 8.31998 12.3205 8.70998 12.7105L13.3 17.3005C13.69 17.6905 14.32 17.6905 14.71 17.3005C15.09 16.9105 15.1 16.2705 14.71 15.8805Z"
                  fill="#A4A4A4" />
              </svg>
            </button>
            <p> 10 / 50</p>
            <button @click="nextPage" :disabled="compState.currentPage >= totalPages">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.29006 15.8805L13.1701 12.0005L9.29006 8.12047C8.90006 7.73047 8.90006 7.10047 9.29006 6.71047C9.68006 6.32047 10.3101 6.32047 10.7001 6.71047L15.2901 11.3005C15.6801 11.6905 15.6801 12.3205 15.2901 12.7105L10.7001 17.3005C10.3101 17.6905 9.68006 17.6905 9.29006 17.3005C8.91006 16.9105 8.90006 16.2705 9.29006 15.8805Z"
                  fill="#A4A4A4" />
              </svg>
            </button>
          </div>
        </div>

       
      </div>
      <div class="flex justify-between pb-2">
        <p class="text-[20px]">รายชื่อโรงพยาบาล</p>
        <p class="text-[20px]">สถานะการใช้งาน</p>
      </div>
    </div>

    <div class="h-64 overflow-y-scroll">
    <div v-for="(item, index) in compState.sites" :key="index" class="flex justify-between py-2">
      <p class="text-[16px]">{{ item.name }}</p>
      <!-- <p class="text-[16px] text-[#22C55E] text-center w-[128px]">
        {{ item.timeStamp }}
      </p> -->
      <div>DROPdown</div>
    </div>
  </div>
  </div>
</template>
<script setup>
import {onMounted, reactive } from "vue"

onMounted(() => {
    run();
});

const compState = reactive({
status:[],
sites:[],
currentPage:12
});



const run = async () => {
  try {
    const accessToken = await fetchAccessToken();
    await fetchAllDetails(accessToken);
  } catch (error) {
    console.error("Error in main function:", error);
  }
};

const fetchAccessToken = async () => {
  const response = await fetch(
    "https://id.trueeye.co/realms/master/protocol/openid-connect/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        username: "trueeye_admin",
        password: "trueeye_adminpwd",
        client_id: "TRUEEYE_SERVICE",
        grant_type: "password",
        client_secret: "VA3GHImiEK8wzEpwmFg2ixuzfRFDwU7C",
        scope: "openid",
      }),
      redirect: "follow",
    }
  );
  const { access_token } = await response.json();
  if (!access_token) throw new Error("Access token not found in the response.");
  return `Bearer ${access_token}`;
};

const fetchAllDetails = async (accessToken) => {
  const response = await fetch(
    `https://id.trueeye.co/admin/realms/master/clients/e16d8587-5209-404f-8f20-804fcf2cb702/user-sessions`,
    {
      method: "GET",
      headers: { Authorization: accessToken },
      redirect: "follow",
    }
  );
  const response2 = await fetch(
      "https://id.trueeye.co/admin/realms/master/groups/",
      {
      method: "GET",
      headers: { Authorization: accessToken },
      redirect: "follow",
    }
    );
    const status = await response.json();
    const groups = await response2.json();
  
  if (Array.isArray(status)) {
  compState.status = status
    .filter(({ username }) => username !== "trueeye_admin")
    .map(({ id, username, userId, start }) => {

      const isOffline = Date.now() - start > 15 * 60 * 1000
      return { 
      id,
      username: username,
      userId: userId || "",
      timeStamp: isOffline ? "ไม่ได้ใช้งานอยู่" : "ใช้งานอยู่"
      }
    });
}

if (Array.isArray(groups)) {
      const siteDetails = groups.map((site) => ({
        id: site.id,
        name: site.name,
      }));
      compState.sites = siteDetails;
      console.log(compState.sites);
      
}


}
</script>





<template>
  <div
    class="bg-slate-800 bg-opacity-30 flex justify-center items-center fixed h-screen w-screen top-0 left-0 z-30"
  >
    <div
      class="z-50 bg-white w-[1080px] h-[560px] drop-shadow-md rounded-lg flex flex-col overflow-hidden"
    >
      <div
        class="self-stretch px-6 py-2 bg-red-500 rounded-tl-lg rounded-tr-lg flex items-center"
      >
        <div class="text-white text-xl leading-loose">Add members</div>
      </div>
      <div class="p-4 w-full flex flex-col h-full">
        <div class="flex items-center gap-2 text-[#a4a4a4] mb-4">
          <p>Member name</p>
          <input
            v-model="compState.searchQuery"
            type="text"
            class="w-[318px] border border-[#a4a4a4] rounded h-10 p-2"
            placeholder="คำค้นหา"
          />
        </div>

        <!-- Table Container -->
        <div
          class="max-h-[360px] col-span-10 inline-block rounded-lg overflow-y-scroll flex-grow"
        >
          <table class="w-full text-center table-fixed pb-10">
            <thead class="sticky top-0 z-10 bg-[#D9D9D9]">
              <tr class="h-10 text-white bg-[#EB4648] select-none">
                <td class="w-[140px] justify-center items-center">
                  <input
                    v-if="filteredUsers.length > 1"
                    type="checkbox"
                    class="hover:cursor-pointer h-4 w-4 mt-2"
                    name="selectAll"
                    :checked="isAllSelected"
                    @change="chooseAll"
                  />
                </td>
                <td class="hover:cursor-pointer">
                  <div class="flex justify-center items-center gap-2">
                    <p>ชื่อ-นามสกุล</p>
                  </div>
                </td>
                <td class="hover:cursor-pointer">
                  <div class="flex justify-center items-center gap-2">
                    <p>ตำแหน่ง</p>
                  </div>
                </td>
                <td class="hover:cursor-pointer">
                  <div class="flex justify-center items-center gap-2">
                    <p>Email</p>
                  </div>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredUsers.length <= 0">
                <td colspan="4" class="h-[300px]">
                  <div
                    class="flex justify-center items-center w-full h-full text-[#A4A4A4]"
                  >
                    No data available
                  </div>
                </td>
              </tr>
              <tr
                v-for="user in filteredUsers"
                :key="user.id"
                @click="navigateTo(`/user/${user.id}`)"
                class="hover:bg-[#FDE8E8] hover:cursor-pointer"
              >
                <td class="hover:cursor-default" @click.stop>
                  <input
                    type="checkbox"
                    class="hover:cursor-pointer h-4 w-4"
                    name="user"
                    :value="user.id"
                    :checked="isUserSelected(user)"
                    @change="choose(user)"
                  />
                </td>
                <td class="truncate h-10 pl-4 text-left">{{ user.name }}</td>
                <td class="truncate h-10">{{ user.role }}</td>
                <td class="truncate h-10">{{ user.email }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="w-full flex justify-between gap-4 mt-4 flex-shrink-0">
          <button
            @click="onCancelClick"
            class="w-full h-10 bg-white rounded border border-[#a4a4a4] text-[#a4a4a4]"
          >
            Cancel
          </button>
          <button
            @click="onConfirmClick"
            class="w-full h-10 bg-[#EB4648] rounded text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
    <div
      class="fixed left-0 right-0 bottom-0 top-0"
      @click.capture="onCancelClick"
    ></div>
  </div>
</template>

<script setup>
import { defineEmits, reactive, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

onMounted(() => {
  run();
});

const compState = reactive({
  isSetPasswordModal: false,
  isJoinSitesModal: false,
  sites: [],
  users: [],
  selectedUsers: [],
  searchQuery: "",
});

const run = async () => {
    const accessToken = await fetchAccessToken();
    await fetchAllDetails(accessToken);
};

const onConfirmClick = async () => {
    const accessToken = await fetchAccessToken();
    await usersJoinSite(accessToken)
    onCancelClick();
    location.reload()
};

const filteredUsers = computed(() => {
  const searchTerm = compState.searchQuery.toString().toLowerCase();
  return compState.users.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm)
    )
  );
});

const isAllSelected = computed(
  () => compState.selectedUsers.length === compState.users.length
);

const choose = (user) => {
  const index = compState.selectedUsers.findIndex((u) => u.id === user.id);
  if (index === -1) {
    compState.selectedUsers.push({ id: user.id, name: user.name });
  } else {
    compState.selectedUsers.splice(index, 1);
  }
  console.log("Selected users:", compState.selectedUsers);
};

const chooseAll = () => {
  if (isAllSelected.value) {
    compState.selectedUsers = [];
  } else {
    compState.selectedUsers = compState.users.map((user) => ({
      id: user.id,
      name: user.name,
    }));
  }
  console.log("Selected users after chooseAll:", compState.selectedUsers);
};

const isUserSelected = (user) =>
  compState.selectedUsers.some((u) => u.id === user.id);

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
  const headers = new Headers();
  headers.append("Authorization", accessToken);

  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://id.trueeye.co/admin/realms/master/users/",
      requestOptions
    );
    const result = await response.json();
    if (Array.isArray(result)) {
      const userDetails = result.map((user) => ({
        id: user.id,
        name: user.username,
        email: user.email || "",
      }));
      compState.users = userDetails;
      console.log("Mapped user details:", userDetails);
    }
  } catch (error) {
    console.error("Error fetching details:", error);
  }
};

const usersJoinSite = async (accessToken) => {
  const headers = new Headers();
  headers.append("Authorization", accessToken);

  const requestOptions = {
    method: "PUT",
    headers: headers,
    redirect: "follow",
  };
  const siteId = route.params.id;
  for (let user of compState.selectedUsers) {
    const userId = user.id;
    fetch(
      `https://id.trueeye.co/admin/realms/master/users/${userId}/groups/${siteId}`,
      requestOptions
    )
      .then((response) => response.text())
      .catch((error) => console.error(error));
  }
};

const emits = defineEmits(["cancel"]);
const onCancelClick = () => {
  emits("cancel");
};
</script>

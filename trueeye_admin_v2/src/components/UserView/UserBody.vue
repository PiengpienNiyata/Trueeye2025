<template>
  <MainBody>
    <template v-slot:maincomponent>
      <div class="p-6 h-full flex flex-col">
        <p class="text-2xl/6 text-[#a4a4a4]">Accounts</p>
        <div class="pt-4 flex gap-4">
          <input
            v-model="compState.searchQuery"
            type="text"
            name=""
            id=""
            class="w-[268px] pl-2 h-10 border-2 border-[#EB4648] rounded"
            placeholder="คำค้นหา"
          />
          <button
            @click="onAddclick"
            class="w-[124px] h-10 flex justify-center items-center gap-x-1 hover:cursor-pointer rounded bg-[#EB4648] text-white"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z"
                :fill="'white'"
              />
            </svg>
            <span>Add</span>
          </button>
          <button
            :disabled = "compState.selectedUsers.length === 0"
            @click="onDeleteClick"
            class="w-[124px] h-10 flex justify-center items-center gap-x-2 rounded"
            :class="[
                compState.selectedUsers.length === 0 
                ? 'bg-[#EFEFEF] text-[#a4a4a4]  cursor-default'
                : 'bg-[#EB4648] text-white cursor-pointer',
              ]"
          >
            <svg
              width="16"
              height="18"
              viewBox="0 0 16 18"
              :fill="compState.selectedUsers.length === 0 ? '#A4A4A4' : 'white'"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 18C2.45 18 1.97933 17.8043 1.588 17.413C1.19667 17.0217 1.00067 16.5507 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8043 17.021 14.413 17.413C14.0217 17.805 13.5507 18.0007 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
              />
            </svg>
            <span>Delete</span>
          </button>
        </div>
        <div class="py-4 flex items-center justify-end gap-1 text-[#A4A4A4]">
          <!-- <button @click="previousPage" :disabled="compState.currentPage <= 1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.71 15.8805L10.83 12.0005L14.71 8.12047C15.1 7.73047 15.1 7.10047 14.71 6.71047C14.32 6.32047 13.69 6.32047 13.3 6.71047L8.70998 11.3005C8.31998 11.6905 8.31998 12.3205 8.70998 12.7105L13.3 17.3005C13.69 17.6905 14.32 17.6905 14.71 17.3005C15.09 16.9105 15.1 16.2705 14.71 15.8805Z"
                fill="#A4A4A4"
              />
            </svg>
          </button>
          <p>1-30 of 1111</p>
          <button
            @click="nextPage"
            :disabled="compState.currentPage >= totalPages"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.29006 15.8805L13.1701 12.0005L9.29006 8.12047C8.90006 7.73047 8.90006 7.10047 9.29006 6.71047C9.68006 6.32047 10.3101 6.32047 10.7001 6.71047L15.2901 11.3005C15.6801 11.6905 15.6801 12.3205 15.2901 12.7105L10.7001 17.3005C10.3101 17.6905 9.68006 17.6905 9.29006 17.3005C8.91006 16.9105 8.90006 16.2705 9.29006 15.8805Z"
                fill="#A4A4A4"
              />
            </svg>
          </button> -->
        </div>

        <div
          class="col-span-10 inline-block rounded-lg overflow-y-scroll flex-grow"
        >
          <table class="w-full text-center table-fixed">
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
                <td class="w-[140px]"></td>
              </tr>
            </thead>
            <tbody>
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
                <td></td>
              </tr>
            </tbody>
          </table>
          <div
            class="sticky bottom-0 rounded-b-lg flex items-center justify-center h-8 bg-[#D9D9D9] select-none text-xs text-[#A4A4A4] text-center"
          >
            Powered by TrueEye
          </div>
        </div>
      </div>
      <transition name="fade">
        <DeleteUserModal
          v-if="compState.isDeleteUserModal"
          @cancel="onCloseDeleteUserModal"
          @confirm="deleteUser"
        />
      </transition>
    </template>
  </MainBody>
</template>

<script setup>
import { onMounted, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { fetchAccessToken } from '@/service/service.js';

const router = useRouter();
// import { useRouter } from 'vue-router;
import DeleteUserModal from "./DeleteUserModal";
import MainBody from "../MainBody.vue";

// const router = useRouter()
const compState = reactive({
  isDeleteUserModal: false,
  searchQuery: "",
  currentPage: "",
  users: [],
  selectedUsers: [],
});

onMounted(() => {
  checkLogin();
  run();
});

const onDeleteClick = () => {
  compState.isDeleteUserModal = true;
};

const onCloseDeleteUserModal = () => {
  compState.isDeleteUserModal = false;
};

const filteredUsers = computed(() => {
  const searchTerm = compState.searchQuery.toString().toLowerCase();
  return compState.users.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm)
    )
  );
});

const run = async () => {
  try {
    const accessToken = await fetchAccessToken();
    await fetchAllDetails(accessToken);
  } catch (error) {
    console.error("Error in main function:", error);
  }
};

const deleteUser = async () => {
  try {
    const accessToken = await fetchAccessToken();
    await deleteUsers(accessToken);
  } catch (error) {
    console.error("Error in main function:", error);
  }
  compState.isDeleteUserModal = false;
  location.reload();
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
      
    }
  } catch (error) {
    console.error("Error fetching details:", error);
  }
};

const deleteUsers = async (accessToken) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", accessToken);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  for (let user of compState.selectedUsers) {
    const userId = user.id;
    try {
      const response = await fetch(
        `https://id.trueeye.co/admin/realms/master/users/${userId}`,
        requestOptions
      );
      if (response.ok) {
        console.log(`Deleted user with ID: ${userId}`);
      } else {
        console.error(
          `Failed to delete user with ID: ${userId}`,
          response.statusText
        );
      }
    } catch (error) {
      console.error(`Error deleting user with ID: ${userId}`, error);
    }
  }
};

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
};

const isUserSelected = (user) =>
  compState.selectedUsers.some((u) => u.id === user.id);

const navigateTo = (path) => {
  router.push(path);
};
const checkLogin = () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    navigateTo("/login");
  }
};
const onAddclick = () => {
  router.push({ name: "usercreate" });
};
</script>

<style scoped>
td {
  min-width: 0;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-color: #a3a3a3;
}
</style>

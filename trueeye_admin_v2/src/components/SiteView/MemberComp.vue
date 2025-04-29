<template>
  <div class="flex gap-x-4">
    <button
      @click="onAddMemClick"
      class="w-[124px] text-sm/6 h-8 flex justify-center items-center gap-x-1 hover:cursor-pointer rounded bg-[#EB4648] text-white mb-6"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="16" height="16" rx="8" fill="#EB4648" />
        <path
          d="M11.9999 8.66671H8.66658V12C8.66658 12.3667 8.36658 12.6667 7.99992 12.6667C7.63325 12.6667 7.33325 12.3667 7.33325 12V8.66671H3.99992C3.63325 8.66671 3.33325 8.36671 3.33325 8.00004C3.33325 7.63337 3.63325 7.33337 3.99992 7.33337H7.33325V4.00004C7.33325 3.63337 7.63325 3.33337 7.99992 3.33337C8.36658 3.33337 8.66658 3.63337 8.66658 4.00004V7.33337H11.9999C12.3666 7.33337 12.6666 7.63337 12.6666 8.00004C12.6666 8.36671 12.3666 8.66671 11.9999 8.66671Z"
          fill="#FCFCFC"
        />
      </svg>
      <span>Add Member</span>
    </button>
    <button
    :disabled = "compState.selectedUsers.length === 0"
      @click="onDeleteMemClick"
      class=" mb-6 w-[124px] text-sm/6 h-8 flex justify-center items-center gap-x-1 rounded"
      :class="[
                compState.selectedUsers.length === 0 
                  ? 'bg-[#EFEFEF] text-[#a4a4a4]  cursor-default'
                  : 'bg-[#EB4648] text-white cursor-pointer',
              ]"
    >
      <span>Delete Member</span>
    </button>
    <!-- <button
      @click="onMoveMemClick"
      class="w-[96px] text-xs/3 h-8 flex justify-center items-center gap-x-1 hover:cursor-pointer rounded bg-[#EFEFEF] text-[#A4A4A4] mb-6"
    >
      <span>Move Member</span>
    </button> -->
  </div>

  <div class="col-span-10 inline-block rounded-lg overflow-y-scroll flex-grow">
    <table class="w-full text-center table-fixed">
      <thead class="sticky top-0 z-10 bg-[#D9D9D9]">
        <tr class="h-10 text-white bg-[#EB4648] select-none">
          <td class="w-[140px] justify-center items-center">
            <input
              v-if="compState.users.length > 1"
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
          v-for="user in compState.users"
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

  <transition name="fade">
    <AddMemberModal
      v-if="compState.isAddMemberModal"
      @cancel="onCloseAddMemberModal"
      @confirm="onConfirmAddMemberModal"
    />
  </transition>

  <transition name="fade">
    <DeleteMemberModal
      v-if="compState.isDeleteMemberModal"
      @cancel="onCloseDeleteMemberModal"
      @confirm="onConfirmClick"
    />
  </transition>

  <transition name="fade">
    <MoveSiteModal
      v-if="compState.isMoveSiteModal"
      @cancel="onCloseMoveSiteModal"
      @confirm="onConfirmMoveSiteModal"
    />
  </transition>
</template>

<script setup>
import { onMounted, reactive, watch, computed } from "vue";
import AddMemberModal from "./AddMemberModal.vue";
import DeleteMemberModal from "./DeleteMemberModal.vue";
import MoveSiteModal from "./MoveSiteModal.vue";
import { useRoute, useRouter } from "vue-router";
import { fetchAccessToken } from '@/service/service.js';

const router = useRouter();
const route = useRoute();

const compState = reactive({
  users: "",
  isAddMemberModal: false,
  isDeleteMemberModal: false,
  isMoveSiteModal: false,
  selectedUsers: [],
});

onMounted(() => {
  checkLogin();
  setTimeout(() => {
    run();
  }, 10);
});

watch(route, () => {
  run();
});

const onAddMemClick = () => {
  compState.isAddMemberModal = true;
};

const onCloseAddMemberModal = () => {
  compState.isAddMemberModal = false;
};

const onDeleteMemClick = () => {
  compState.isDeleteMemberModal = true;
};

const onCloseDeleteMemberModal = () => {
  compState.isDeleteMemberModal = false;
};

// const onMoveMemClick = () => {
//   compState.isMoveSiteModal = true;
// };

// const onCloseMoveSiteModal = () => {
//   compState.isMoveSiteModal = false;
// };

const run = async () => {
  try {
    const accessToken = await fetchAccessToken();
    await fetchAllDetails(accessToken);
  } catch (error) {
    console.error("Error in main function:", error);
  }
};

const onConfirmClick = async () => {
  try {
    const accessToken = await fetchAccessToken();
    await usersleaveSite(accessToken);
   location.reload()
  } catch (error) {
    console.error("Error in main function:", error);
  }
  compState.isDeleteMemberModal = false;
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

const fetchAllDetails = async (accessToken) => {
  const siteId = route.params.id;
  const response = await fetch(
    `https://id.trueeye.co/admin/realms/master/groups/${siteId}/members`,
    {
      method: "GET",
      headers: { Authorization: accessToken },
      redirect: "follow",
    }
  );
  const result = await response.json();
  if (Array.isArray(result)) {
    compState.users = result.map(({ id, username, email }) => ({
      id,
      name: username,
      email: email || "",
    }));
  }
};

const usersleaveSite = async (accessToken) => {
  const headers = new Headers();
  headers.append("Authorization", accessToken);

  const requestOptions = {
    method: "DELETE",
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

const navigateTo = (path) => {
  router.push(path);
};

const checkLogin = () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    navigateTo("/login");
  }
};
</script>

<template>
  <MainBody>
    <template v-slot:maincomponent>
      <div class="p-6">
        <p class="text-2xl/6 text-[#a4a4a4]">Create Account</p>
        <div class="w-[985px] pt-7 grid grid-cols-2 gap-x-4 gap-y-2">
          <div class="w-full flex-wrap col-span-2 h-[78px]">
            <p class="mb-2 text-[#a4a4a4]">Email</p>
            <input
              class="w-full h-10 p-2 rounded border-[1px] border-[#a4a4a4]"
            />
          </div>
          <div class="w-full h-[78px]">
            <p class="mb-2 text-[#a4a4a4]">Frist name</p>
            <input
              class="w-full h-10 p-2 rounded border-[1px] border-[#a4a4a4]"
            />
          </div>
          <div class="w-full h-[78px]">
            <p class="mb-2 text-[#a4a4a4]">Last name</p>
            <input
              class="w-full h-10 p-2 rounded border-[1px] border-[#a4a4a4]"
            />
          </div>
          <div class="w-full h-[78px]">
            <p class="mb-2 text-[#a4a4a4]">Position</p>
            <select
              class="w-full h-10 p-2 rounded border-[1px] border-[#a4a4a4] text-[#a4a4a4]"
            >
              <option :value="'Admin'">Admin</option>
              <option :value="'Doctor'">Doctor</option>
            </select>
          </div>
          <div
            @click="onSetPasswordModal"
            class="w-full h-[78px] cursor-pointer"
          >
            <p class="mb-2 text-[#a4a4a4]">Set Password</p>
            <div
              class="w-full h-10 p-2 rounded bg-[#EB4648] text-center text-white"
            >
              Set password
            </div>
          </div>
        </div>

        <p class="py-2 text-[#a4a4a4]">Sites</p>
        <div class="w-full flex flex-wrap gap-4">
          <div
            v-for="(site, index) in sites"
            :key="index"
            class="w-[207px] bg-white h-16 p-2 rounded justify-center items-center gap-2 inline-flex border-[1px] border-[#a4a4a4]"
          >
            <div class="grow text-center text-[#a4a4a4]">{{ site.name }}</div>
            <svg
              class="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18.3 5.70973C17.91 5.31973 17.28 5.31973 16.89 5.70973L12 10.5897L7.10997 5.69973C6.71997 5.30973 6.08997 5.30973 5.69997 5.69973C5.30997 6.08973 5.30997 6.71973 5.69997 7.10973L10.59 11.9997L5.69997 16.8897C5.30997 17.2797 5.30997 17.9097 5.69997 18.2997C6.08997 18.6897 6.71997 18.6897 7.10997 18.2997L12 13.4097L16.89 18.2997C17.28 18.6897 17.91 18.6897 18.3 18.2997C18.69 17.9097 18.69 17.2797 18.3 16.8897L13.41 11.9997L18.3 7.10973C18.68 6.72973 18.68 6.08973 18.3 5.70973Z"
                fill="#A4A4A4"
              />
            </svg>
          </div>
          <div
            @click="onJoinSitesModal"
            class="w-[207px] h-16 p-2 bg-[#EB4648] rounded justify-center items-center gap-2 inline-flex cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z"
                fill="white"
              />
            </svg>
            <div class="grow text-center text-white">Join Sites</div>
          </div>
        </div>
        <div class="flex gap-4 mt-8">
          <div
            class="w-[182px] h-10 p-2 border-[#a4a4a4] border rounded cursor-pointer"
          >
            <div class="grow text-center text-[#a4a4a4]">Cancel</div>
          </div>
          <div
            @click="onSaveUserModal"
            class="w-[182px] h-10 p-2 bg-[#EB4648] rounded cursor-pointer"
          >
            <div class="grow text-center text-white">Save</div>
          </div>
        </div>
      </div>
      <transition name="fade">
        <SetPasswordModal
          v-if="compState.isSetPasswordModal"
          @cancel="onCloseSetPasswordModal"
          @confirm="onConfirmSetPasswordModal"
        />
      </transition>
      <transition name="fade">
        <JoinSitesModal
          v-if="compState.isJoinSitesModal"
          @cancel="onCloseJoinSitesModal"
          @confirm="onConfirmJoinSitesModal"
        />
      </transition>
      <transition name="fade">
        <SaveUserModal
          v-if="compState.isSaveUserModal"
          @cancel="onCloseSaveUserModal"
          @confirm="onConfirmSaveUserModal"
        />
      </transition>
    </template>
  </MainBody>
</template>

<script setup>
import { onMounted, reactive } from "vue";
// import { useRouter } from 'vue-router'
import SetPasswordModal from "./SetPasswordModal.vue";
import JoinSitesModal from "./JoinSitesModal.vue";
import SaveUserModal from "./SaveUserModal.vue";
import MainBody from "../MainBody.vue";
import { sites } from "../../utility/data.js";

onMounted(() => {
  // checkLogin()
  compState.sites = sites;
});
const compState = reactive({
  isSetPasswordModal: false,
  isJoinSitesModal: false,
  isSaveUserModal: false,
  sites: [],
});

const onSetPasswordModal = () => {
  compState.isSetPasswordModal = true;
};

const onCloseSetPasswordModal = () => {
  compState.isSetPasswordModal = false;
};
const onJoinSitesModal = () => {
  compState.isJoinSitesModal = true;
};

const onCloseJoinSitesModal = () => {
  compState.isJoinSitesModal = false;
};

const onSaveUserModal = () => {
  compState.isSaveUserModal = true;
};

const onCloseSaveUserModal = () => {
  compState.isSaveUserModal = false;
};
// const navigateTo = (path) => {
//   router.push(path)
// }
// const checkLogin = () => {
//   const token = sessionStorage.getItem('token')
//   if (!token) {
//     navigateTo('/login')
//   }
// }
</script>

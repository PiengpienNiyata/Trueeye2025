<template>
  <div class="grid grid-cols-4">
    <div class="bg-[#FCFCFC]">
      <button
        @click="onCreateCamera"
        class="w-[124px] h-8 flex justify-center items-center gap-x-1 hover:cursor-pointer rounded bg-[#EB4648] text-white mb-6"
      >
        <!-- <svg
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
        </svg> -->
        <span class="text-sm">Create Camera</span>
      </button>

      <div
        v-for="(camera, index) in cameras"
        :key="index"
        @click="onChangeCamera(camera)"
        class="h-10 flex justify-between px-2 items-center mb-1"
        :class="{
          'bg-[#F2F2F2] text-[#EB4648]':
            compState.isCamera.name === camera.name,
          'text-[#696969]': compState.isCamera.name !== camera.name,
        }"
      >
        {{ camera.name }}
        <svg
          @click="onDeleteCamera"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clip-path="url(#clip0_99_8653)">
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16 13H8C7.45 13 7 12.55 7 12C7 11.45 7.45 11 8 11H16C16.55 11 17 11.45 17 12C17 12.55 16.55 13 16 13Z"
              :fill="
                compState.isCamera.name === camera.name ? '#EB4648' : '#F2F2F2'
              "
            />
          </g>
          <defs>
            <clipPath id="clip0_99_8653">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
    <div class="col-span-3 pl-4 bg-slate-50">
      <div class="justify-between flex px-6">
        <div class="flex gap-2">
          <button
            @click="onDeleteClick"
            class="p-2 text-sm/6 h-8 flex justify-center items-center gap-x-1 hover:cursor-pointer rounded bg-[#EB4648] text-white mb-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_112_14242)">
                <path
                  d="M14.6663 8.00004C14.6663 4.32004 11.6797 1.33337 7.99967 1.33337C4.31967 1.33337 1.33301 4.32004 1.33301 8.00004C1.33301 11.68 4.31967 14.6667 7.99967 14.6667C11.6797 14.6667 14.6663 11.68 14.6663 8.00004ZM9.99967 4.33337L12.0997 6.43337C12.233 6.56671 12.233 6.77337 12.0997 6.90671L9.99967 9.00004V7.33337H7.33301V6.00004H9.99967V4.33337ZM5.99967 11.6667L3.89967 9.56671C3.76634 9.43337 3.76634 9.22671 3.89967 9.09337L5.99967 7.00004V8.66671H8.66634V10H5.99967V11.6667Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_112_14242">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span>Change Attribute Set </span>
          </button>
          <button
            @click="onDeleteClick"
            class="w-[124px] text-sm/6 h-8 flex justify-center items-center gap-x-1 hover:cursor-pointer rounded bg-[#EFEFEF] text-[#A4A4A4] mb-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
            >
              <g clip-path="url(#clip0_112_14239)">
                <path
                  d="M8.50033 3.9998V5.19313C8.50033 5.49313 8.86033 5.6398 9.06699 5.42646L10.927 3.56646C11.0603 3.43313 11.0603 3.22646 10.927 3.09313L9.06699 1.23313C8.86033 1.02646 8.50033 1.17313 8.50033 1.47313V2.66646C5.55366 2.66646 3.16699 5.05313 3.16699 7.9998C3.16699 8.69313 3.30033 9.3598 3.54699 9.96646C3.72699 10.4131 4.30033 10.5331 4.64033 10.1931C4.82033 10.0131 4.89366 9.7398 4.79366 9.4998C4.60033 9.0398 4.50033 8.52646 4.50033 7.9998C4.50033 5.79313 6.29366 3.9998 8.50033 3.9998ZM12.3603 5.80646C12.1803 5.98646 12.107 6.26646 12.207 6.4998C12.3937 6.96646 12.5003 7.47313 12.5003 7.9998C12.5003 10.2065 10.707 11.9998 8.50033 11.9998V10.8065C8.50033 10.5065 8.14033 10.3598 7.93366 10.5731L6.07366 12.4331C5.94033 12.5665 5.94033 12.7731 6.07366 12.9065L7.93366 14.7665C8.14033 14.9731 8.50033 14.8265 8.50033 14.5331V13.3331C11.447 13.3331 13.8337 10.9465 13.8337 7.9998C13.8337 7.30646 13.7003 6.6398 13.4537 6.03313C13.2737 5.58646 12.7003 5.46646 12.3603 5.80646Z"
                  fill="#A4A4A4"
                />
              </g>
              <defs>
                <clipPath id="clip0_112_14239">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            <span>Reset Default</span>
          </button>
        </div>
        <button
          @click="onDeleteClick"
          class="w-[124px] text-sm/6 h-8 flex justify-center items-center gap-x-2 hover:cursor-pointer rounded bg-[#EFEFEF] text-[#A4A4A4]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <g clip-path="url(#clip0_112_14691)">
              <path
                d="M11.7267 2.39333C11.4733 2.14 11.1333 2 10.78 2H3.33333C2.59333 2 2 2.6 2 3.33333V12.6667C2 13.4 2.6 14 3.33333 14H12.6667C13.4 14 14 13.4 14 12.6667V5.22C14 4.86667 13.86 4.52667 13.6067 4.28L11.7267 2.39333ZM8 12.6667C6.89333 12.6667 6 11.7733 6 10.6667C6 9.56 6.89333 8.66667 8 8.66667C9.10667 8.66667 10 9.56 10 10.6667C10 11.7733 9.10667 12.6667 8 12.6667ZM8.66667 6H4.66667C3.93333 6 3.33333 5.4 3.33333 4.66667C3.33333 3.93333 3.93333 3.33333 4.66667 3.33333H8.66667C9.4 3.33333 10 3.93333 10 4.66667C10 5.4 9.4 6 8.66667 6Z"
                fill="#A4A4A4"
              />
            </g>
            <defs>
              <clipPath id="clip0_112_14691">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span>Save</span>
        </button>
      </div>
      <div>
        <table class="w-full">
          <thead class="">
            <tr>
              <td class="w-5/12 pl-12">Key</td>
              <td class="text-center">Value</td>
              <td class="w-3/12"></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="pl-8">Attribute A</td>
              <td class="text-center">AAA</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <transition name="fade">
    <CreateCameraModal
      v-if="compState.isCreateCameraModal"
      @cancel="onCloseCreateCamera"
      @confirm="onConfirmCreateCamera"
    />
  </transition>

  <transition name="fade">
    <DeleteCameraModal
      v-if="compState.isDeleteCameraModal"
      @cancel="onCloseDeleteCamera"
      @confirm="onConfirmDeleteCamera"
    />
  </transition>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import CreateCameraModal from "./CreateCameraModal.vue";
import DeleteCameraModal from "./DeleteCameraModal.vue";
import { cameras } from "../../utility/data.js";

onMounted(() => {
  compState.cameras = cameras;
  compState.isCamera = cameras[0];
});

const compState = reactive({
  isCamera: { name: "" },
  isCreateCameraModal: false,
  isDeleteCameraModal: false,
  cameras: [],
});

const onCreateCamera = () => {
  compState.isCreateCameraModal = true;
};

const onCloseCreateCamera = () => {
  compState.isCreateCameraModal = false;
};

const onDeleteCamera = () => {
  compState.isDeleteCameraModal = true;
};

const onCloseDeleteCamera = () => {
  compState.isDeleteCameraModal = false;
};

function onChangeCamera(camera) {
  compState.isCamera = camera;
}

function onDeleteClick() {
  console.log("Delete button clicked");
}
</script>

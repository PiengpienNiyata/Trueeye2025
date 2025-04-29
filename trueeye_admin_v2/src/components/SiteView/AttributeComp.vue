<template>
  <div class="pr-9 flex justify-between">
    <button
      @click="onCreateAttribute"
      class="w-[124px] text-sm/6 h-8 flex justify-center items-center gap-x-1 hover:cursor-pointer rounded bg-[#EB4648] text-white "
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
      <span>Create List</span>
    </button>
    <button
      :disabled="
        JSON.stringify(compState.attributes) ===
        JSON.stringify(compState.oldAttributes)
      "
      @click="onSaveClick()"
      class="w-[124px] text-sm/6 h-8 flex justify-center items-center gap-x-2 rounded"
      :class="[
                 JSON.stringify(compState.attributes) ===
                 JSON.stringify(compState.oldAttributes)
                  ? 'bg-[#EFEFEF] text-[#a4a4a4] cursor-default'
                  : 'bg-[#EB4648] text-white cursor-pointer',
              ]"
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
           :fill="JSON.stringify(compState.attributes) ===
                 JSON.stringify(compState.oldAttributes)? '#A4A4A4' : 'white'"
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

  <div class="relative w-full h-full">
    <div class="overflow-y-auto absolute  inset-0 pb-10">
      <table class="w-full">
        <thead class="sticky top-0 bg-[#FCFCFC] ">
          <tr>
            <td class="w-5/12 pt-4 text-left text-xl text-[#A4A4A4]">Key</td>
            <td class="w-4"></td>
            <td class="w-6/12 pt-4 text-left text-xl text-[#A4A4A4]">Value</td>
            <td class="p-4"></td>
          </tr>
        </thead>
        <tbody>
          <tr
            class="gap-4"
            v-for="(item, index) in compState.attributes"
            :key="index"
          >
            <td class="p-0">
              <div
                class="pl-4 h-10 border border-[#B4B4B4] text-[#696969] flex items-center mt-4"
              >
                <input
                  v-model="item.key"
                  :disabled="compState.defaultAttributes.includes(item.key)"
                  @input="index"
                  class="bg-transparent border-none w-full outline-none text-[#696969]"
                  type="text"
                />
              </div>
            </td>
            <td class="p-0"></td>
            <td class="p-0">
              <div
                class="pl-4 h-10 w-full border border-[#B4B4B4] text-[#696969] flex items-center mt-4"
              >
                <input
                  v-model="item.value"
                  @input="index"
                  class="bg-transparent border-none w-full outline-none text-[#696969]"
                  type="text"
                />
              </div>
            </td>
            <td
              class="p-0"
              v-if="!compState.defaultAttributes.includes(item.key)"
            >
              <div
                @click="onDeleteAttribute(index)"
                class="pl-4 mt-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clip-path="url(#clip0_126_16868)">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16 13H8C7.45 13 7 12.55 7 12C7 11.45 7.45 11 8 11H16C16.55 11 17 11.45 17 12C17 12.55 16.55 13 16 13Z"
                      fill="#EB4648"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_126_16868">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <transition name="fade">
    <CreateAttributeModal
      v-if="compState.isCreateAttributeModal"
      @cancel="onCloseCreateAttribute"
      @confirm="onConfirmCreateAttribute"
    />
  </transition>

  <transition name="fade">
    <DeleteAttributeModal
      v-if="compState.isDeleteAttributeModal"
      @cancel="onCloseDeleteAttribute"
      @confirm="onConfirmDeleteAttribute(index)"
    />
  </transition>
</template>
<script setup>
import { onMounted, reactive, watch } from "vue";
import CreateAttributeModal from "./CreateAttributeModal.vue";
import DeleteAttributeModal from "./DeleteAttributeModal.vue";
import { store } from "../../utility/store";
import { useRoute } from "vue-router";
import { fetchAccessToken } from '@/service/service.js';

const route = useRoute();

onMounted(() => {
  setTimeout(() => {
    run();
  }, 10);
});

watch(route, () => {
  run();
});

const compState = reactive({
  attributes: [],
  oldAttributes: [],
  defaultAttributes: ["CFG_ENCODING"],
  isCreateAttributeModal: false,
  isDeleteAttributeModal: false,
  name: "",
  path: "",
  index: "",
});

const onCreateAttribute = () => {
  compState.isCreateAttributeModal = true;
};

const onCloseCreateAttribute = () => {
  compState.isCreateAttributeModal = false;
};

const onDeleteAttribute = (index) => {
  compState.isDeleteAttributeModal = true;
  compState.index = index;
};

const onCloseDeleteAttribute = () => {
  compState.isDeleteAttributeModal = false;
};

const onConfirmDeleteAttribute = () => {
  compState.attributes.splice(compState.index, 1);
  // onSaveClick();
  compState.isDeleteAttributeModal = false;
};

const onConfirmCreateAttribute = () => {
  createAttributeClick();
  compState.isCreateAttributeModal = false;
};

const run = async () => {
  try {
    const accessToken = await fetchAccessToken();
    await fetchAllDetails(accessToken);
  } catch (error) {
    console.error("Error in main function:", error);
  }
};

const onSaveClick = async () => {
  try {
    const accessToken = await fetchAccessToken();
    await updateAttribute(accessToken);
    run();
  } catch (error) {
    console.error("Error in main function:", error);
  }
};

const createAttributeClick = async () => {
  try {
    const accessToken = await fetchAccessToken();
    await createAttribute(accessToken);
    run();
  } catch (error) {
    console.error("Error in main function:", error);
  }
};

const fetchAllDetails = async (accessToken) => {
  const siteId = route.params.id;
  const response = await fetch(
    `https://id.trueeye.co/admin/realms/master/groups/${siteId}`,
    {
      method: "GET",
      headers: { Authorization: accessToken },
      redirect: "follow",
    }
  );
  const result = await response.json();
  if (result.attributes) {
    const attributesArray = Object.entries(result.attributes).map(
      ([key, value]) => ({
        key,
        value: value[0] || "",
      })
    );
    compState.attributes = attributesArray;
    compState.oldAttributes = JSON.parse(JSON.stringify(attributesArray));
    if (
      result.attributes["CFG_OTP"] &&
      result.attributes["CFG_OTP"][0] === "True"
    ) {
      store.otpCheck = true;
    } else {
      store.otpCheck = false;
    }
  }
  compState.name = result.name || "";
  compState.path = result.path || "";
};

const updateAttribute = async (accessToken) => {
  const siteId = route.params.id;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", accessToken);

  const attributesObject = compState.attributes.reduce(
    (acc, { key, value }) => {
      acc[key] = [value];
      return acc;
    },
    {}
  );

  const raw = JSON.stringify({
    name: compState.name,
    path: compState.path,
    subGroupCount: 0,
    subGroups: [],
    attributes: attributesObject,
    realmRoles: ["trueeye_customer"],
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    `https://id.trueeye.co/admin/realms/master/groups/${siteId}`,
    requestOptions
  )
    .then((response) => response.text())
    .catch((error) => console.error(error));
};

const createAttribute = async (accessToken) => {
  const siteId = route.params.id;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", accessToken);

  const attributesObject = compState.attributes.reduce(
    (acc, { key, value }) => {
      acc[key] = [value];
      return acc;
    },
    {}
  );
  attributesObject[store.attributeKey] = [store.attributeValue];
  const raw = JSON.stringify({
    name: compState.name,
    path: compState.path,
    subGroupCount: 0,
    subGroups: [],
    attributes: attributesObject,
    realmRoles: ["trueeye_customer"],
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    `https://id.trueeye.co/admin/realms/master/groups/${siteId}`,
    requestOptions
  )
    .then((response) => response.text())
    .catch((error) => console.error(error));
};
</script>

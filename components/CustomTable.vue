<script setup>
import { ref, watch, onMounted } from "vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { store } from "@/composables/states.js";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";

const props = defineProps({
  storeKey: {
    required: true,
  },
  cols: {
    required: true,
  },
  addDialogId: {
    default: "add-item",
  },
  hideAdd: {
    default: true,
  },
});

const router = useRouter();
const searchQuery = ref("");
const storeData = store[props.storeKey];

const updateUrlParams = (params) => {
  const cleanParams =
    params &&
    Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== null && value !== "")
    );
  router.push({ query: cleanParams });
};

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  storeData?.params &&
    Object.keys(storeData?.params)?.forEach((key) => {
      const value = urlParams.get(key);
      if (value !== null) {
        storeData.params[key] =
          key === "page" || key === "per_page" ? Number(value) : value;
      }
    });
  updateUrlParams(storeData?.params);
  await storeData?.refresh();
});

watch(
  () => storeData?.params,
  async (newParams) => {
    updateUrlParams(newParams);
    await storeData?.refresh();
  },
  { deep: true }
);

const changeServer = async (data) => {
  Object.assign(storeData.params, {
    page: data.current_page,
    per_page: data.pagesize,
    sort_column: data.sort_column,
    sort_direction: data.sort_direction,
  });
};

const handleSearch = async () => {
  storeData.params.search = searchQuery.value || null;
  storeData.params.page = 1;
};

const clearSearch = async () => {
  searchQuery.value = "";
  storeData.params.search = null;
  storeData.params.page = 1;
};

watch(searchQuery, (newValue) => {
  if (newValue === "") {
    clearSearch();
  }
});

watch(
  () => storeData?.params?.search,
  (newValue) => {
    searchQuery.value = newValue || "";
  }
);

const dialogHandle = (id, data = null) => {
  if (data) {
    store.formData = data;
  }
  store.dialogs[id] = true;
};

const popoverHandle = (id) => {
  store.popovers[id] = true;
};
</script>

<template>
  <main>
    <div class="mb-5 flex justify-between items-center">
      <div class="flex justify-between items-center gap-2">
        <Input
          v-model="searchQuery"
          type="text"
          class="max-w-xs"
          placeholder="Search..."
          @keyup.enter="handleSearch"
        />
        <Button @click="handleSearch">Search</Button>
        <Button @click="clearSearch">Clear</Button>
      </div>
      <template v-if="hideAdd">
        <CustomDialog :dialogId="addDialogId">
          <Button @click="dialogHandle(addDialogId)">Add</Button>
        </CustomDialog>
      </template>
    </div>
    <Vue3Datatable
      :sortable="true"
      :isServerMode="true"
      :columns="cols"
      :rows="storeData?.data?.data"
      :totalRows="storeData?.data?.total"
      :pageSize="storeData?.params?.per_page"
      :sortColumn="storeData?.params?.sort_column"
      :sortDirection="storeData?.params?.sort_direction"
      :loading="storeData?.pending"
      @change="changeServer"
    >
      <template #status="data">
        <Badge variant="destructive">{{ data.value.status }}</Badge>
      </template>
      <template #image="data">
        <img
          :src="
            data.value.image ? `${backendUrl}${data.value.image}` : `/placeholder.png`
          "
          class="rounded-full cursor-pointer hover:shadow-xl shadow-md w-[30px] h-[30px] object-cover"
          alt="Item image"
        />
      </template>
      <template #actions="data">
        <slot name="actions" :data="data">
          <div class="flex gap-2">
            <NuxtLink :to="`/${props.storeKey}/view/${data.value.id}`">
              <Button variant="secondary">View</Button>
            </NuxtLink>
            <CustomDialog
              :data="data"
              :dialogId="`edit-${props.storeKey}-${data.value.id}`"
            >
              <Button
                @click="
                  dialogHandle(`edit-${props.storeKey}-${data.value.id}`, data.value)
                "
                >Edit</Button
              >
            </CustomDialog>
            <Confirm :id="`popover-${data.value.id}`">
              <Button
                @click="popoverHandle(`popover-${data.value.id}`)"
                variant="destructive"
                >Delete</Button
              >
            </Confirm>
          </div>
        </slot>
      </template>
    </Vue3Datatable>
  </main>
</template>

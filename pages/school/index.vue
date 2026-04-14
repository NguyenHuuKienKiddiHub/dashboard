<template>
  <div class="flex-1 flex flex-col h-full bg-gray-50/30">
    <SchoolListHeader />
    <SchoolListTabs />

    <!-- Body chứa Danh sách -->
    <div class="flex-1 overflow-y-auto p-6">
      <div class="text-sm text-gray-500 flex items-center gap-1 mb-4">
        Tìm thấy:
        <span class="font-bold text-gray-800">{{ total }} kết quả</span>
      </div>

      <div v-if="pending" class="space-y-4">
        <USkeleton v-for="i in 5" :key="i" class="h-28 w-full rounded-xl" />
      </div>

      <div v-else class="flex flex-col gap-4">
        <SchoolCard
          v-for="school in schools"
          :key="school.id"
          :school="school"
        />
      </div>
    </div>

    <!-- Pagination bar -->
    <div
      class="shrink-0 px-6 py-3 bg-white border-t border-gray-200 flex items-center justify-between gap-4"
    >
      <!-- Range info -->
      <span class="text-xs text-gray-400 shrink-0">
        {{ rangeFrom }}–{{ rangeTo }} / {{ total }}
      </span>

      <!-- Page navigator -->
      <UPagination
        :page="currentPage"
        :total="total"
        :page-size="perPage"
        size="xs"
        @update:page="(p) => pushQuery({ page: p })"
      />

      <!-- Per-page selector -->
      <div class="flex items-center gap-2 shrink-0">
        <span class="text-xs text-gray-400">Hiển thị</span>
        <USelect
          :model-value="perPage"
          :items="perPageOptions"
          size="xs"
          class="w-20"
          @update:model-value="(v) => pushQuery({ per_page: v, page: null })"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PaginatedApiResponse } from "~/types/api";
import type { School } from "~/types/models";

definePageMeta({
  layout: "default",
});

const route = useRoute();

const perPageOptions = [
  { label: "10 / trang", value: 10 },
  { label: "20 / trang", value: 20 },
  { label: "50 / trang", value: 50 },
  { label: "100 / trang", value: 100 },
];

const { compareJson, pushQuery } = useSchoolFilter();

// Derive page & per_page from route query — no separate watcher needed.
// router.push (from pushQuery) is a single atomic update → useFetch fires once.
const currentPage = computed(() => Number(route.query.page ?? 1));
const perPage = computed(() => Number(route.query.per_page ?? 20));

const { list } = useSchoolApi();
const { data: rawData, pending } = list({
  page: currentPage,
  per_page: perPage,
  compare: compareJson,
});

const pagination = computed(
  () => (rawData.value as PaginatedApiResponse<School> | null)?.data,
);
const schools = computed((): School[] => pagination.value?.data ?? []);
const total = computed(() => pagination.value?.total ?? 0);

const rangeFrom = computed(() => {
  if (total.value === 0) return 0;
  return (currentPage.value - 1) * perPage.value + 1;
});
const rangeTo = computed(() =>
  Math.min(currentPage.value * perPage.value, total.value),
);
</script>

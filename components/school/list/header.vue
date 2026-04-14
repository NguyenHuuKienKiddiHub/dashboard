<template>
  <div
    class="h-16 px-6 shrink-0 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex justify-between items-center"
  >
    <!-- Left: icon + title -->
    <div class="flex items-center gap-1.5">
      <UButton
        icon="i-heroicons-building-office-2"
        variant="ghost"
        color="neutral"
        size="sm"
        square
      />
      <span class="text-base font-semibold">Trường/Trung tâm</span>
    </div>

    <!-- Right: search + add -->
    <div class="flex items-center gap-2">
      <SharedSuggestNode
        node="schools"
        fields="id,name"
        compare-by="name"
        placeholder="Tìm kiếm"
        input-class="w-44"
        @select="onSelect"
        @enter="onEnter"
      />
      <UButton
        color="primary"
        size="md"
        icon="i-heroicons-plus"
        to="/school/create"
      >
        Thêm mới
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SuggestItem } from "~/types/models";

const { pushQuery } = useSchoolFilter();

function onSelect(item: SuggestItem) {
  navigateTo(`/school/${item.id}`);
}

function onEnter(keywords: string) {
  pushQuery({ name: keywords });
}
</script>

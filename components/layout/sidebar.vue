<template>
  <aside
    class="w-64 shrink-0 bg-slate-50 flex flex-col h-full border-r border-gray-200"
  >
    <!-- Header Sidebar -->
    <div class="h-16 px-4 flex flex-col justify-center gap-1">
      <div class="text-xl font-bold text-green-600 tracking-tight">
        KiddiHub<span class="text-xs align-top">*</span>
      </div>
      <div
        class="text-[10px] font-bold text-green-600 uppercase tracking-wider"
      >
        Dashboard
      </div>
    </div>

    <!-- Scrollable Area -->
    <div class="flex-1 overflow-y-auto flex flex-col p-4 gap-4 hide-scrollbar">
      <!-- Search Input -->
      <UInput
        icon="i-heroicons-magnifying-glass"
        placeholder="Search..."
        color="gray"
        size="md"
        class="w-full"
      >
        <template #trailing>
          <div class="flex items-center gap-1">
            <UKbd size="sm">⌘</UKbd>
            <UKbd size="sm">K</UKbd>
          </div>
        </template>
      </UInput>

      <!-- Main Navigation -->
      <nav class="flex flex-col gap-1">
        <!-- Active Link -->
        <NuxtLink
          to="/school"
          class="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-600 rounded-md outline outline-1 outline-green-500"
        >
          <UIcon name="i-heroicons-building-office-2" class="w-5 h-5" />
          <span class="text-sm font-bold">Trường/Trung tâm</span>
        </NuxtLink>

        <!-- Normal Links -->
        <NuxtLink
          v-for="link in mainLinks"
          :key="link.label"
          :to="link.to"
          class="flex items-center gap-2 px-3 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
        >
          <UIcon :name="link.icon" class="w-5 h-5" />
          <span class="text-sm font-bold">{{ link.label }}</span>
        </NuxtLink>

        <!-- Dropdown Menu 1: Blog -->
        <div class="mt-2">
          <button
            @click="isBlogOpen = !isBlogOpen"
            class="w-full flex items-center justify-between px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
          >
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-newspaper" class="w-5 h-5" />
              <span class="text-sm font-bold">Blog</span>
            </div>
            <UIcon
              :name="
                isBlogOpen
                  ? 'i-heroicons-chevron-down'
                  : 'i-heroicons-chevron-right'
              "
              class="w-4 h-4"
            />
          </button>
          <!-- Sub-items -->
          <div v-show="isBlogOpen" class="pl-7 mt-1 flex flex-col gap-1">
            <NuxtLink
              v-for="sub in blogLinks"
              :key="sub.label"
              :to="sub.to"
              class="flex items-center gap-2 px-3 py-2 text-sm font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              <UIcon :name="sub.icon" class="w-4 h-4" />
              {{ sub.label }}
            </NuxtLink>
          </div>
        </div>

        <!-- Dropdown Menu 2: Địa lý -->
        <div class="mt-1">
          <button
            @click="isGeoOpen = !isGeoOpen"
            class="w-full flex items-center justify-between px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
          >
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-map" class="w-5 h-5" />
              <span class="text-sm font-bold">Địa lý</span>
            </div>
            <UIcon
              :name="
                isGeoOpen
                  ? 'i-heroicons-chevron-down'
                  : 'i-heroicons-chevron-right'
              "
              class="w-4 h-4"
            />
          </button>
          <!-- Sub-items -->
          <div v-show="isGeoOpen" class="pl-7 mt-1 flex flex-col gap-1">
            <NuxtLink
              v-for="sub in geoLinks"
              :key="sub.label"
              :to="sub.to"
              class="flex items-center gap-2 px-3 py-2 text-sm font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              <UIcon :name="sub.icon" class="w-4 h-4" />
              {{ sub.label }}
            </NuxtLink>
          </div>
        </div>

        <!-- External Links -->
        <NuxtLink
          to="#"
          target="_blank"
          class="flex items-center gap-2 px-3 py-2 mt-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
        >
          <UIcon name="i-heroicons-document-text" class="w-5 h-5" />
          <span class="text-sm font-bold flex-1">Label</span>
          <UIcon name="i-heroicons-arrow-up-right" class="w-3 h-3" />
        </NuxtLink>
      </nav>
    </div>

    <!-- User Profile Bottom -->
    <div class="p-4 border-t border-gray-200">
      <div
        class="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition"
      >
        <UAvatar src="https://placehold.co/32x32" size="sm" />
        <span class="text-sm font-bold text-gray-700">User</span>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isBlogOpen = ref(true);
const isGeoOpen = ref(true);

const mainLinks = [
  { label: "Khóa học", icon: "i-heroicons-book-open", to: "#" },
  {
    label: "Yêu cầu tư vấn",
    icon: "i-heroicons-chat-bubble-left-ellipsis",
    to: "#",
  },
  { label: "Đánh giá", icon: "i-heroicons-star", to: "#" },
  { label: "Ưu đãi", icon: "i-heroicons-ticket", to: "#" },
  { label: "Dịch vụ", icon: "i-heroicons-briefcase", to: "#" },
  { label: "Tuyển dụng", icon: "i-heroicons-user-group", to: "#" },
];

const blogLinks = [
  { label: "Chủ đề", icon: "i-heroicons-hashtag", to: "#" },
  { label: "Bài viết", icon: "i-heroicons-pencil-square", to: "#" },
  { label: "Danh mục", icon: "i-heroicons-folder", to: "#" },
];

const geoLinks = [
  { label: "Tỉnh/Thành phố", icon: "i-heroicons-map-pin", to: "#" },
  { label: "Xã/Phường (mới)", icon: "i-heroicons-building-library", to: "#" },
  { label: "Khu vực", icon: "i-heroicons-globe-asia-australia", to: "#" },
];
</script>

<style scoped>
/* Ẩn thanh cuộn cho mượt */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

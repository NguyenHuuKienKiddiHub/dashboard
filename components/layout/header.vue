<template>
  <header
    class="h-16 bg-emerald-600 flex items-center justify-between px-4 text-white shrink-0"
  >
    <div class="w-56 font-bold text-xl flex items-center">
      KiddiHub<span class="text-xs align-top">*</span>
    </div>

    <div class="flex-1 flex flex-col px-4 border-l border-emerald-500">
      <span class="text-sm font-bold">Phạm Tiến Mạnh</span>
      <div class="flex items-center gap-2 text-[10px]">
        <span class="px-1.5 border border-white/50 rounded">Quản trị viên</span>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <button
        class="p-1.5 rounded hover:bg-emerald-700 transition"
        :title="isDark ? 'Chuyển sang sáng' : 'Chuyển sang tối'"
        @click="toggleColorMode"
      >
        <UIcon
          :name="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
          class="w-5 h-5"
        />
      </button>

      <div class="relative">
        <UIcon name="i-heroicons-bell" class="w-6 h-6" />
        <span
          class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
          >1</span
        >
      </div>
      <UAvatar src="https://placehold.co/40x40" alt="Avatar" size="sm" />
    </div>
  </header>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

function toggleColorMode() {
  colorMode.preference = isDark.value ? "light" : "dark";
}
</script>

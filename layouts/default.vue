<template>
  <div
    class="flex h-screen w-full bg-white font-['Nunito'] overflow-hidden text-gray-800"
  >
    <!-- Cột trái: Sidebar -->
    <LayoutSidebar />

    <!-- Cột phải: Header + Nội dung chính thay đổi theo trang -->
    <main class="flex-1 flex flex-col h-full overflow-hidden">
      <LayoutHeader />
      <div class="flex-1 overflow-y-auto">
        <slot />
      </div>
    </main>
  </div>
</template>

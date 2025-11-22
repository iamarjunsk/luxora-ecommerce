<template>
    <div class="flex min-h-screen bg-gray-100 font-sans">
        <AdminSidebar />
        <main class="flex-grow p-8 overflow-y-auto">
            <slot />
        </main>
    </div>
</template>

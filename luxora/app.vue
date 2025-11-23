```
<script setup>
onMounted(() => {
    $fetch('/api/analytics/track', { method: 'POST' })
})
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

```

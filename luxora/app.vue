```
<script setup>
onMounted(() => {
    $fetch('/api/analytics/track', { method: 'POST' })
})
</script>

<template>
    <NuxtLoadingIndicator color="#D4AF37" :height="3" />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

```

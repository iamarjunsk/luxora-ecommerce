<template>
    <div class="flex items-center gap-1">
        <button v-for="star in 5" :key="star" @click="!readonly && updateRating(star)" :disabled="readonly" :class="[
            readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110 transition-transform',
            size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6'
        ]" class="focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :fill="star <= rating ? '#D4AF37' : 'none'"
                :stroke="star <= rating ? '#D4AF37' : '#D1D5DB'" stroke-width="2" class="w-full h-full">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
        </button>
        <span v-if="showCount && readonly" class="text-sm text-gray-600 ml-2">({{ count }})</span>
    </div>
</template>

<script setup>
const props = defineProps({
    rating: {
        type: Number,
        default: 0
    },
    readonly: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: 'md', // sm, md, lg
        validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    showCount: {
        type: Boolean,
        default: false
    },
    count: {
        type: Number,
        default: 0
    }
})

const emit = defineEmits(['update:rating'])

const updateRating = (star) => {
    emit('update:rating', star)
}
</script>

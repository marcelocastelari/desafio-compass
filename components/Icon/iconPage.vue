<template>
    <svg 
        xmlns="http://www.w3.org/2000/svg"   
        viewBox="0 0 24 24" 
        fill="none"
        :width="size"
        :height="size"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
        class="feather feather-external-link">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
        :color="color"></path>
        <polyline :color="color" points="15 3 21 3 21 9"></polyline>
        <line
        :color="color"
        x1="10" y1="14" x2="21" y2="3"></line></svg>

</template>

<script>
    export default {
        props: {
            size: { type: [String, Number], default: 22 },
            color: { type: String, default: 'white' }
        }
    }
</script>
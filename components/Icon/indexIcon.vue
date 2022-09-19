<template>
    <component :is="name" v-bind="$props"/>
</template>

<script>
    import Loading from './iconLoading.vue'
    import Play from './iconPlay.vue'
    import Reading from './iconReading.vue'
    import Page from './iconPage.vue'

    export default {
        components: { Loading, Play, Reading, Page },
        props: {
            name: { type: String, required: true }
        }
    }
</script>
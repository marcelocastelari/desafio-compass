<template>
    <div class="relative items-top justify-center min-h-screen bg-gray-50 sm:pt-0">
        <IndexHeader />
            <BaseCard class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 m-8 lg:m-16" />
        </div>
</template>

<script>
import IndexHeader from './indexHeader.vue';
import BaseCard from './baseCard.vue';

    export default {
    components: { IndexHeader, BaseCard },

    
    data() {
        return {

        }
    },

    methods: {

        getContent() {

        }
    }
}
</script>
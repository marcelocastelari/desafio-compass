<template>
    <div class="relative items-top justify-center min-h-screen bg-gray-50 sm:pt-0 overflow-x-hidden">
        <IndexHeader/>
        <BaseCard class="" />
    </div>
</template>

<script>
import BaseCard from './baseCard.vue';
import IndexHeader from './indexHeader.vue';

    export default {
    components: { BaseCard, IndexHeader },

    
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
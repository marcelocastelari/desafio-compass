<template>
    <div class="w-screen h-screen bg-gray-50 overflow-x-hidden">
        <div class="w-full h-screen overflow-hidden" v-if="isLoading">
            <div class="w-full h-screen flex justify-center items-center">
                <Icon name="loading" class="animate-spin" />
            </div>
        </div>
        <div class="w-full" v-else>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 m-8 lg:m-16 overflow-x-hidden">

                <div v-for="content in contents" :key="content.id"
                    class="flex flex-col w-11/12 bg-white rounded-lg p-3 hover:shadow-xl border border-gray-300 overflow-hidden duration-300 ease-out transform hover:-translate-y-px">
                    <nuxt-link :to="{name:page, params: { contentId }}">
                        <div class="p-5 space-y-3" @click="getId(content.id)">
                            <h1 class="font-medium flex justify-center mt-3" v-if="content.title.length<50">{{
                            content.title
                            }}</h1>
                            <h1 class="font-medium flex justify-center mt-3" v-else>{{
                            content.title.substring(0,60)+".." }}
                            </h1>

                            <div class="font-sm text-gray-500" v-if="content.description.length==0">
                                <p>Acesse para ver o conteúdo completo.</p>
                            </div>
                            <div class="font-sm text-gray-500" v-if="content.description.length<50">
                                {{ content.description }}
                            </div>
                            <div class="font-sm text-gray-500" v-else>
                                {{ content.description.substring(0,135)+"..." }}
                            </div>

                            <div class="flex items-center justify-center mt-auto px-4 h-12 border-t border-gray-300">
                                <div class="flex justify-center items-center mt-3">
                                    <span
                                        class=" flex absolute bottom-4 justify-center items-center rounded bg-green-400 text-white w-24 p-2">Acessar
                                    </span>
                                </div>
                            </div>
                        </div>
                    </nuxt-link>
                </div>
            </div>
        </div>
        <IndexFooter />
    </div>

</template>

<script>

import gql from 'graphql-tag';
import Icon from '../components/Icon/indexIcon.vue'
import IndexFooter from './indexFooter.vue';

export default {

    components: { Icon, IndexFooter },

    data() {
        return {
            page: 'contentPage',
            contentId: '',
            createdAt: '',
            isVideo: false,
            isLoading: false,
            contents: {},
        }
    },

    async created() {
        this.isLoading = true
        const query = gql` 
                    query getAllContents {
                        contents {
                            id
                            title
                            embeddable
                            allow_download
                            description
                            created_at
                            updated_at
                            url
                        }
                    }`
        this.response = await this.$apollo.query({
            query: query
        })
        this.contents = this.response.data.contents
        this.isLoading = false
    },


    methods: {
        getId(id) {
            this.contentId = id
            console.log(this.contentId)
            if (this.contentId != this.$store.state.content.id) {
                this.$store.commit('getId', this.contentId)
                //window.location.reload()
            }

        },
    },
}
</script>
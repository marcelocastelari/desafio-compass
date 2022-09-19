<template>
    <nuxt-link :to="{name:page, params: { contentId }}">
        <div
        v-for="content in contents" :key="content.id"
        class="flex flex-col w-11/12 bg-white rounded-lg p-3  hover:shadow-xl border border-gray-300 overflow-hidden duration-300 ease-out transform hover:-translate-y-px"
        @click="getId(content.id)"
        >
        <div class="p-5 space-y-3">
            <h1 class="font-medium flex justify-center mt-3" v-if="content.title.length<50">{{ content.title }}</h1>
            <h1 class="font-medium flex justify-center mt-3" v-else>{{ content.title.substring(0,60)+".." }}</h1>        

                <div class="font-sm text-gray-500" v-if="content.description.length==0">
                    <p>Acesse para ver o conteúdo completo.</p>
                </div>
                <div class="font-sm text-gray-500" v-if="content.description.length<50">
                    {{ content.description }}
                </div>
                <div class="font-sm text-gray-500" v-else>
                    {{ content.description.substring(0,135)+"..." }}
                </div>
    
        </div>
        <div class="flex items-center justify-center mt-auto px-4 h-12 border-t border-gray-300"> 
            <div class="flex mt-3">
                <button class="flex justify-center items-center rounded bg-green-400 text-white w-24 p-2">Acessar</button>
            </div>
        </div>
        
        </div>
    </nuxt-link>
</template>

<script>

import gql from 'graphql-tag';
import Icon from '../components/Icon/indexIcon.vue'

    export default {

        components: { Icon },

        data() {
            return {
                page: 'contentPage',
                contentId: '',
                createdAt: '',
                isVideo: false,
                content: {},
            }
        },

            apollo: {
                contents: gql ` 
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
                }`,
                 
            },            

        methods: {
            getId(id) {
                this.contentId = id
                console.log(this.contentId)
                if(this.contentId != this.$store.state.content.id) {
                    this.$store.commit('getId', this.contentId)
                    //window.location.reload()
                }
                
            },
        },
    }
</script>
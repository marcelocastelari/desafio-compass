<template>
    <div class="max-w-7xl mx-auto overflow-hidden">
        <h2 class="bg-green-400 font-bold text-white px-3 py-2">Todos os conteúdos</h2>
        <div class="mb-8 space-y-1.5">
            <nuxt-link class="focus:outline-none" :to="{name:page, params: { contentId }}">
            <div class="flex justify-between items-center space-x-4 h-14 bg-gray-100 px-3 py-auto rounded-md m-7"
            v-for="content in contents" :key="content.id"
            @click="getId(content.id)"
            >
            <h1 class="font-medium flex justify-center mt-3" v-if="content.title.length<50">
                {{ content.title }}
            </h1>
            <h1 class="font-medium flex justify-center mt-3" v-else>
                {{ content.title.substring(0,60)+".." }}
            </h1>
                <div class=""> 
                            <button class="bg-green-400 p-2 text-white rounded focus:outline-none"
                            >
                                Acessar
                            </button>
                        </div>
                    </div>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag';

    export default {

        data() {
            return {
                page: 'contentPage',
                contentId: ''
            }
        },

        created() {

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
                    window.location.reload()
                }
                
            },
        },
    }
</script>
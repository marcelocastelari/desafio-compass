<template>
    <div class="max-w-7xl mx-auto">
        <h2 class="bg-green-400 font-bold text-white px-3 py-2">Todos os conteúdos</h2>
        <div class="mb-8 space-y-1.5">
            <nuxt-link :to="{name:page, params: { contentId }}">
            <div class="flex justify-between items-center space-x-4 h-14 bg-gray-100 px-3 py-2 rounded-md m-5"
            v-for="content in contents" :key="content.id"
            @click="getId(content.id)"
            >
                {{ content.title }}
                <div class=""> 
                            <button class="bg-green-400 p-2 text-white rounded"
                               
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
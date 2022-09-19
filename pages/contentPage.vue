<template>
    <div class="w-screen h-screen bg-gray-50 overflow-x-hidden">
        <div v-if="!isLoading">
            <IndexHeader />
        </div>
        <div class="w-full h-screen mt-5" v-else="isLoading">
            <div class="flex w-screen h-screen justify-center items-center text-white">
                <Icon name="loading" class="animate-spin" />
            </div>
        </div>
        <div class="p-4">
            <!--Se for vídeo, carrego o componente-->
            <BaseVideo v-if="isVideo" />
            <!--Se não, outros conteúdos-->
            <div class="max-w-7xl flex-col md:flex-row flex mx-auto md:space-x-8 space-y-4 md:space-y-0 shadow-md bg-white rounded-lg p-4 lg:p-6 mb-16 mt-6"
                v-else>
                <div class="flex flex-col lg:w-full">
                    <h1 class="flex justify-center font-bold text-2xl mb-5">{{ this.$store.state.content.title }}</h1>
                    <div class="space-y-3 ">
                        <h1 class="bg-green-400 p-2 font-medium text-white w-full">Descrição:</h1>
                        <div  class="text-gray-600 space-y-3">
                            
                                <span v-html>
                                    <p v-html="contentDescription">
                                        {{ contentDescription }}
                                    </p>
                                </span>
                           
                        </div>
                        <div class="w-full"
                            v-if="this.$store.state.content.url && this.$store.state.content.embeddable">
                            <iframe :src="this.$store.state.content.url" width="100%" height="700"
                                frameborder="0"></iframe>
                        </div>
                        <div v-if="!!isUrl && this.$store.state.content.embeddable === false">
                            <div class="flex justify-center">
                                <p class="font-medium text-red-500">Este conteúdo está disponível através de um link
                                    externo, para acessá-lo utilize o botão abaixo.</p>
                            </div>
                            <div class="flex justify-center">
                                <a :href="this.$store.state.content.url" target="blank">
                                    <button class="flex bg-green-400 p-2 mt-5 text-white rounded">
                                        Acessar conteúdo
                                        <Icon class="ml-3" name="page" />
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="mt-auto pt-3">
                        <div>
                            <div class=" flex items-center justify-between">
                                <div>
                                    <div class="text-sm text-gray-400 items-center justify-center">
                                        Criado em:
                                    </div>
                                    <div class="text-sm text-gray-400">
                                        {{ createdAt }}
                                    </div>
                                </div>


                                <div v-if="this.$store.state.content.updated_at">
                                    <div class="text-sm text-gray-400 items-center justify-center">
                                        Atualizado em:
                                    </div>
                                    <div class="text-sm text-gray-400" >
                                        {{ updatedAt }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <ContentCard />

            </div>
        </div>
    </div>
</template>

<script>

import gql from 'graphql-tag';
import Icon from '../components/Icon/indexIcon.vue'
import IndexHeader from '~/components/indexHeader.vue';
import BaseCard from '~/components/baseCard.vue';
import BaseVideo from '../components/baseVideo.vue';
import ContentCard from '../components/contentCard.vue';

export default {

    components: { Icon, IndexHeader, BaseCard, BaseVideo, ContentCard },

    data() {
        return {
            id: this.$store.state.id,
            response: {},
            isLoading: false,
            isVideo: false,
            link: '',
            isUrl: false,
            createdAt: '',
            updatedAt: '',
            contentDescription: '',
            timestamp: 0
        }
    },

    async created() {
        this.isLoading = true
        const query = gql` 
                query getContent($id: String!) {
                    getContent(id: $id) {
                        id
                        title
                        description
                        id
                        title
                        description
                        type
                        url
                        embeddable
                        allow_download
                        created_at
                        updated_at
                    }
                }`

        this.response = await this.$apollo.query({
            query: query,
            variables: {
                id: this.id
            }

        })

        // commito o conteúdo
        this.$store.commit('getContent', this.response.data.getContent);

        //depois de obter o conteudo, termino o carregamento
        this.isLoading = false
        this.link = this.$store.state.content.url
        //console.log('esse é o link', this.link)

        //valido se o conteúdo é video
        if (this.$store.state.content.url != null) {
            if (this.$store.state.content.url.indexOf("youtube") > -1) {
                this.isVideo = true
            }
        }

        if (this.$store.state.content.url) {
            this.isUrl = true
            console.log(this.isUrl)
        }

        this.getDate()

        this.contentDescription = this.$store.state.content.description

    },

    methods: {
        getSomething() {

        },

        getDate() {
            this.timestamp = { seconds: 0, miliseconds: this.$store.state.content.created_at, nanoseconds: 0 }
            this.createdAt = new Date(this.timestamp.miliseconds * 1).toLocaleString()
            console.log(this.createdAt)

            if(this.$store.state.content.updated_at != null) {
                let timestampUpdated = { seconds: 0, miliseconds: this.$store.state.content.updated_at, nanoseconds: 0 }
                this.updatedAt = new Date(timestampUpdated.miliseconds * 1).toLocaleString()
                console.log(this.updatedAt)
            }
        }
    }
}

</script>
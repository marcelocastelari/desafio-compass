<template>
    <div class="relative items-top justify-center min-h-screen bg-gray-50 sm:pt-0 overflow-x-hidden">
        <IndexHeader/>
        <BaseContent />
    </div>
</template>

<script>

import gql from 'graphql-tag';
import Icon from '../components/Icon/indexIcon.vue'
import IndexHeader from '~/components/indexHeader.vue';
import BaseCard from '~/components/baseCard.vue';
import BaseVideo from '../components/baseVideo.vue';
import ContentCard from '../components/contentCard.vue';
import BaseContent from '~/components/baseContent.vue';

export default {

    components: { Icon, IndexHeader, BaseCard, BaseVideo, ContentCard, BaseContent },

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
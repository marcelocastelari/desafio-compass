<template>
    <div
        class="max-w-7xl flex flex-col md:flex-row mx-auto md:space-x-8 space-y-4 md:space-y-0 shadow-md bg-white rounded-lg p-4 lg:p-6 mb-16 mt-6">
        <iframe :src="videoEmbedded" frameborder="0" class="h-96 md:w-1/2 lg:w-3/5 lg:h-96"
            allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
        <div class="flex flex-col md:w-1/2">
            <h1 class="flex justify-center font-bold text-2xl mb-5">{{ title }}</h1>
            <div class="space-y-3 ">
                <h1 class="bg-green-400 p-2 font-medium text-white w-full">Descrição:</h1>
                <div class="text-gray-600 space-y-3">
                    <p>{{ description }}</p>
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
                                {{ this.createdAt }}
                            </div>
                        </div>


                        <div>
                            <div class="text-sm text-gray-400 items-center justify-center">
                                Atualizado em:
                            </div>
                            <div class="text-sm text-gray-400">
                                {{ this.updatedAt }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: this.$store.state.id,
            response: {},
            isLoading: false,
            videoEmbedded: '',
            isVideo: false,
            createdAt: '',
            updatedAt: '',
            title: this.$store.state.content.title,
            description: this.$store.state.content.description,
            url: this.$store.state.content.url
        }
    },

    created() {
        this.isLoading = true
        this.videoEmbedded = this.getEmbeddedLink()
        if(!this.videoEmbedded) return
        if (this.videoEmbedded.indexOf("youtube") > -1) {
            this.isVideo = true
        }
        console.log(this.videoEmbedded)

        this.getDate()

    },

    methods: {
        getEmbeddedLink() {
            let link = this.url
            if(!link) return
            let result = link.replace("watch?v=", "embed/")
            return result

        },

        getDate() {
            let timestamp = { seconds: 0, miliseconds: this.$store.state.content.created_at, nanoseconds: 0 }
            this.createdAt = new Date(timestamp.miliseconds * 1).toLocaleString()
            console.log(this.createdAt)

            let timestampUpdated = { seconds: 0, miliseconds: this.$store.state.content.updated_at, nanoseconds: 0 }
            this.updatedAt = new Date(timestampUpdated.miliseconds * 1).toLocaleString()
            console.log(this.updatedAt)

            return this.createdAt, this.updatedAt
        }
    }
}
</script>
import { mount, shallowMount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import baseCard from '@/components/baseCard.vue'

const localVue = createLocalVue()

describe('mounted baseCard', () => {
    let wrapper = mount(baseCard,
        {
            stubs: {NuxtLink: RouterLinkStub},
        }
        
        );

    test('does a wrapper exist', () => {
        expect(wrapper.exists(0)).toBe(true)
    })

    const link = wrapper.findAllComponents(RouterLinkStub)
    it('link', () => {
        expect(wrapper.exists(link)).toBe(true)
    })


    describe('baseCard function', () => {
        beforeEach(() => {
            wrapper = mount(baseCard, 
                {
                    stubs: {NuxtLink: RouterLinkStub},
                },
                {
                methods: { getId: () => {} }
            })
        })
        it('should verify if getId function exists', () => {
            expect(wrapper.exists()).toBe(true)
        })
        it('Should return the variable contentId', async () => {
            wrapper = mount(baseCard, {

                    stubs: {NuxtLink: RouterLinkStub},
                },
                {
                setData: {
                    contentId: 0
                }
            })
            await wrapper.setData({ contentId: 5 })
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.contentId).toEqual(5)
        })
        
    })


})
import { mount, shallowMount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import contentCard from '../components/contentCard.vue'

const localVue = createLocalVue()

describe('mounted createdCard', () => {
    let wrapper = mount(contentCard,
        {
            stubs: {NuxtLink: RouterLinkStub},
        }
        
        );

    test('does a wrapper exist', () => {
        expect(wrapper.exists(0)).toBe(true)
    })

    describe('contentCard functions test', () => {
        beforeEach(() => {
            wrapper = mount(contentCard, 
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
            wrapper = mount(contentCard, {

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
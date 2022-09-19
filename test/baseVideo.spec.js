import { mount, shallowMount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import baseVideo from '@/components/baseVideo.vue'


const localVue = createLocalVue()
describe('mounted baseCard', () => {
    const wrapper = shallowMount(baseVideo, {
        setData: {
            timestamp: 0
        },
        mocks: {
            $store: {
                state: {
                    id:123,
                    content: {
                        title:'abc'
                    }
                }
            }
        }
    })

    it('does a wrapper exist', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it("should verify if title value is 'abc'", () => {
        expect(wrapper.vm.title).toEqual('abc')
    })
}) 
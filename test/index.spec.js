import { mount, shallowMount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import index from '@/pages/index'

const localVue = createLocalVue()

describe('mounted baseCard', () => {
    let wrapper = mount(index, {
        stubs: {NuxtLink: RouterLinkStub},
    }
    
    );
    test('does a wrapper exist', () => {
        expect(wrapper.exists(0)).toBe(true)
    })
})
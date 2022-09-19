import { mount, shallowMount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import indexPage from '@/components/indexPage.vue'

const localVue = createLocalVue()

describe('mounted baseCard', () => {
    let wrapper = mount(indexPage, {
        stubs: {NuxtLink: RouterLinkStub},
    }
    
    );
    test('does a wrapper exist', () => {
        expect(wrapper.exists(0)).toBe(true)
    })
})
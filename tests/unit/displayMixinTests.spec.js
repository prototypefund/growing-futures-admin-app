import { shallowMount } from '@vue/test-utils'
import DisplayDummy from './components/DisplayDummy.vue'

describe('Mixin should resolve uids of a product to a product', () => {

   it('should display kg in filter', () => {
     let wrapper = shallowMount(DisplayDummy, { propsData: { unit: 'w' }})
     let div = wrapper.find("div")
     expect(div.text()).toEqual("kg")
   })

  it('should display kg', () => {
    let wrapper = shallowMount(DisplayDummy, {})
    let unit = wrapper.vm.displayProductUnit('w') 
    expect(unit).toEqual('kg')
   })

  it('should display Bund', () => {
    let wrapper = shallowMount(DisplayDummy, {})
    let unit = wrapper.vm.displayProductUnit('b') 
    expect(unit).toEqual('Bund')
   })

  it('should display Stück', () => {
    let wrapper = shallowMount(DisplayDummy, {})
    let unit = wrapper.vm.displayProductUnit('p') 
    expect(unit).toEqual('Stück')
   })

  it('should display k/A', () => {
    let wrapper = shallowMount(DisplayDummy, {})
    let unit = wrapper.vm.displayProductUnit('unknown unit') 
    expect(unit).toEqual('k/A')
   })
 })


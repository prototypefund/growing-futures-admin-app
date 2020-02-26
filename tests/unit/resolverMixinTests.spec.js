import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ResolverDummy from './components/ResolverDummy.vue'

const localVue = createLocalVue()

import products from './data/products.json'
import shareTypes from './data/shareTypes.json'
import users from './data/users.json'

localVue.use(Vuex)

describe('Mixin should resolve uids of a product to a product', () => {
  let store
  beforeEach(() => {
     let getters = {
              products: () => products,
            }
     store = new Vuex.Store({
              getters
           })
  })

  it('should find the product', () => {
    let wrapper = shallowMount(ResolverDummy, { store, localVue })
    let product = wrapper.vm.resolveProductId('product0003')
    let expectedProduct = { categories: [ 'salat' ],
                            image: '',
                            name: 'Chinesische Keule',
                            uid: 'product0003',
                            unit: 'g' }

    expect(product).toEqual(expectedProduct)
  })
  
  it('should return an empty object if not found', () => {
    let wrapper = shallowMount(ResolverDummy, { store, localVue })
    let product = wrapper.vm.resolveProductId('product0000')

    expect(product).toEqual({})
  })

  it('should find the productName', () => {
    let wrapper = shallowMount(ResolverDummy, { store, localVue })
    let productName = wrapper.vm.resolveProductIdToName('product0003')

    expect(productName).toEqual("Chinesische Keule")
  })

  it('should return an undefined name when not product is found', () => {
    let wrapper = shallowMount(ResolverDummy, { store, localVue })
    let productName = wrapper.vm.resolveProductIdToName('product0000')

    expect(productName).toEqual("not found: product0000")
  })

})

describe('Mixin should resolve expand share types according to store-content', () => {
  let store
  beforeEach(() => {
     let getters = {
              shareTypes: () => shareTypes,
              users: () => users,
            }
     store = new Vuex.Store({
              getters
           })
  })

  it('should resolve to a valid shareType', () => {
    let wrapper = shallowMount(ResolverDummy, { store, localVue })
    let shareConfig = wrapper.vm.shareConfig

    let share1 = shareConfig.find(sc => sc.type=='shareType0001') 
    let share2 = shareConfig.find(sc => sc.type=='shareType0002') 

    expect(share1.name).toEqual("Großer Anteil")
    expect(share2.name).toEqual("Kleiner Anteil")

    expect(share1.factor).toEqual(1)
    expect(share2.factor).toEqual(0.5)
  })

  it('should resolve to a valid shareType', () => {
    let wrapper = shallowMount(ResolverDummy, { store, localVue })
    let shareConfig = wrapper.vm.resolveId('not existing')
    expect(shareConfig.factor).toEqual(NaN)
    expect(shareConfig.name).toEqual('Not found')
    expect(shareConfig.type).toEqual('Not found')
    expect(shareConfig.uid).toEqual('not existing')
  })

})


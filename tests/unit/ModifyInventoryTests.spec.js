import { shallowMount,  createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ModifyInventory from '@/components/inventory/ModifyInventory.vue'
import { utils } from '@/mixins/utils.js'
import { SessionState } from '@/mixins/SessionState.js'

import inventoryForProduct from './data/modifyHistory.json'
import products from './data/products.json'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.mixin(utils)
localVue.mixin(SessionState)

describe('ModifyInventory', () => {
  let store
  beforeEach(() => {
     let getters = {
              products: () => products,
            }
     store = new Vuex.Store({
              getters
           })
  })

  it('should calculate correct reconcilation amounts', () => {
    let propsData = { inventoryForProduct: inventoryForProduct } 
    let wrapper = shallowMount(ModifyInventory, { store, localVue, propsData:propsData })
    let inventory = inventoryForProduct.pivot.value[0]
    let reconcilation = wrapper.vm.createReconcilationTransaction(inventory)

    expect(reconcilation.product).toEqual('product0002')
    expect(reconcilation.amount).toEqual(-inventory.value)
    expect(reconcilation.unit).toEqual(inventory.unit)
      
  })

  it('should calculate correct reconcilation amounts when changing reconciledAmount', () => {
    let propsData = { inventoryForProduct: inventoryForProduct } 
    let wrapper = shallowMount(ModifyInventory, { store, localVue, propsData:propsData })
    let inventory = inventoryForProduct.pivot.value[0]
    wrapper.setData({reconciledAmount: 100})
    let reconcilation = wrapper.vm.createReconcilationTransaction(inventory)

    expect(reconcilation.product).toEqual('product0002')
    expect(reconcilation.amount).toEqual(-inventory.value+100)
    expect(reconcilation.unit).toEqual(inventory.unit)
      
  })

})


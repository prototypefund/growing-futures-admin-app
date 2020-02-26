import { shallowMount,  createLocalVue } from '@vue/test-utils'
import InventoryHistory from '@/components/inventory/InventoryHistory.vue'
import { utils } from '@/mixins/utils.js'

import inventoryAtoms from './data/inventoryAtoms.json'

const localVue = createLocalVue()
localVue.mixin(utils)

describe('InventoryHistoryTests', () => {

  it('should sort by timestamp', () => {
    let atoms = [ {date: "2019-12-06T09:26:43.032Z"},
                  {date: "2019-12-04T12:33:00.000Z"},
                  {date: "2019-12-06T13:20:38.153Z"} ]

    let propsData = { inventoryAtoms: inventoryAtoms }
    let wrapper = shallowMount(InventoryHistory, { localVue, propsData:propsData })
    let sortedAtoms = wrapper.vm.sortByDate(atoms)
    expect(sortedAtoms[0].date).toEqual("2019-12-06T13:20:38.153Z")
    expect(sortedAtoms[1].date).toEqual("2019-12-06T09:26:43.032Z")
    expect(sortedAtoms[2].date).toEqual("2019-12-04T12:33:00.000Z")
  })

  it('should do nothing if nothing is specified', () => {
    let propsData = { inventoryAtoms: inventoryAtoms }
    let wrapper = shallowMount(InventoryHistory, { localVue, propsData:propsData })
    let sortedAtoms = wrapper.vm.sortedAtoms
    expect(sortedAtoms).toHaveLength(12)
  })

  it('should only return the max number of elements', () => {
    let propsData = { inventoryAtoms: inventoryAtoms,
                      maxNumber: 10,
                    }
    let wrapper = shallowMount(InventoryHistory, { localVue, propsData:propsData })
    let sortedAtoms = wrapper.vm.sortedAtoms
    expect(sortedAtoms).toHaveLength(10)
  })

  it('should only return filtered elements', () => {
    let filter1 = f => f.user == 'Alois'
    let propsData = { inventoryAtoms: inventoryAtoms,
                      filters: [filter1]
                    }
    let wrapper = shallowMount(InventoryHistory, { localVue, propsData:propsData })
    expect(wrapper.vm.sortedAtoms).toHaveLength(1)

    let filter2 = f => f.user == 'John Doe'
    wrapper.setProps({filters: [filter2]})
    expect(wrapper.vm.sortedAtoms).toHaveLength(11)
  })

  it('should work with several filters', () => {

    let filter1 = f => f.user == 'John Doe'
    let filter2 = f => f.unit == 'w'

    let propsData = { inventoryAtoms: inventoryAtoms,
                      filters: [filter1, filter2]
                    }
    let wrapper = shallowMount(InventoryHistory, { localVue, propsData:propsData })
    expect(wrapper.vm.sortedAtoms).toHaveLength(5)
  })

  it('should work with several filters and retain max number', () => {
    let filter1 = f => f.user == 'John Doe'
    let filter2 = f => f.unit == 'w'

    let propsData = { inventoryAtoms: inventoryAtoms,
                      filters: [filter1, filter2],
                      maxNumber: 3
                    }
    let wrapper = shallowMount(InventoryHistory, { localVue, propsData:propsData })
    expect(wrapper.vm.sortedAtoms).toHaveLength(3)
  })

  it('should work with several filters and retain max number', () => {
    let filter1 = f => f.user == 'John Doe'
    let filter2 = f => f.unit == 'w'

    let propsData = { inventoryAtoms: inventoryAtoms,
                      filters: [filter1, filter2],
                      maxNumber: 3
                    }
    let wrapper = shallowMount(InventoryHistory, { localVue, propsData:propsData })
    expect(wrapper.vm.sortedAtoms).toHaveLength(3)
  })

  it('should work with several filters and retain max number', () => {
    let filter1 = f => f.user == 'John Doe'
    let filter2 = f => f.unit == 'w'

    let propsData = { inventoryAtoms: inventoryAtoms,
                      filters: [filter1, filter2],
                      maxNumber: 3
                    }
    let wrapper = shallowMount(InventoryHistory, { localVue, propsData:propsData })
    //console.log(wrapper.vm.sortedAtoms)
  })
})


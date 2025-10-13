import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AddTask from '@/components/AddTask.vue'

describe('AddTask.vue', () => {
  let wrapper

  // beforeEach runs before each test case
  // This ensures each test starts with a fresh component
  beforeEach(() => {
    wrapper = mount(AddTask, {
      props: {
        board: 'TODO'
      }
    })
  })

  describe('Empty Input Validation', () => {
    it('should not emit onAddTask event when input is empty', async () => {
      // ARRANGE: Get the button element
      const button = wrapper.find('button')

      // ACT: Click the button with empty input
      await button.trigger('click')

      // ASSERT: Check that no event was emitted
      expect(wrapper.emitted('onAddTask')).toBeFalsy()
    })

    it('should not emit onAddTask event when input contains only whitespace', async () => {
      // ARRANGE: Find the input and set it to whitespace
      const input = wrapper.find('input')
      await input.setValue('   ')

      // ACT: Click the add button
      const button = wrapper.find('button')
      await button.trigger('click')

      // ASSERT: Event should not be emitted for whitespace-only input
      expect(wrapper.emitted('onAddTask')).toBeFalsy()
    })

    it('should emit onAddTask event when input has valid text', async () => {
      // ARRANGE: Set valid task title
      const input = wrapper.find('input')
      await input.setValue('New task')

      // ACT: Click the button
      const button = wrapper.find('button')
      await button.trigger('click')

      // ASSERT: Event should be emitted with correct data
      expect(wrapper.emitted('onAddTask')).toBeTruthy()
      expect(wrapper.emitted('onAddTask')[0][0]).toEqual({
        title: 'New task',
        status: 'TODO'
      })
    })

    it('should clear input after successful task addition', async () => {
      // ARRANGE: Set valid task title
      const input = wrapper.find('input')
      await input.setValue('Task to clear')

      // ACT: Click the button to add task
      const button = wrapper.find('button')
      await button.trigger('click')

      // ASSERT: Input should be cleared
      expect(input.element.value).toBe('')
    })
  })
})

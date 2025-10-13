import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TasksPage from '@/views/pages/TasksPage.vue'
import AddTask from '@/components/AddTask.vue'
import TaskCard from '@/components/TaskCard.vue'

// Mock Firebase/Vuefire
// This replaces the real Firebase calls with fake ones we can control
vi.mock('vuefire', () => ({
  useCollection: vi.fn(() => ({
    value: [] // Mock empty tasks array initially
  })),
  useFirestore: vi.fn(() => ({})),
  useCurrentUser: vi.fn(() => ({
    value: { uid: 'test-user-123' }
  }))
}))

// Mock Firebase functions
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  addDoc: vi.fn(),
  serverTimestamp: vi.fn(() => new Date()),
  doc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn()
}))

describe('TasksPage.vue', () => {
  let wrapper

  beforeEach(() => {
    // Mount the component with all necessary setup
    wrapper = mount(TasksPage, {
      global: {
        // Make child components available
        components: {
          AddTask,
          TaskCard
        },
        // Stub out icons from lucide-vue-next
        stubs: {
          Plus: true
        }
      }
    })
  })

  describe('Board Rendering', () => {
    it('should render all 4 boards (Backlog, Todo, In Progress, Done)', () => {
      // ASSERT: Check that all board titles are rendered
      const text = wrapper.text()

      expect(text).toContain('Backlog')
      expect(text).toContain('Todo')
      expect(text).toContain('In Progress')
      expect(text).toContain('Done')
    })

    it('should render boards in a 4-column grid layout', () => {
      // ASSERT: Check the grid structure
      const grid = wrapper.find('.grid-cols-4')
      expect(grid.exists()).toBe(true)
    })
  })

  describe('Task Input Toggle', () => {
    it('should show AddTask component when Plus icon is clicked', async () => {
      // ARRANGE: Initially AddTask should not be visible
      let addTaskComponents = wrapper.findAllComponents(AddTask)
      expect(addTaskComponents.length).toBe(0)

      // ACT: Click the first Plus button (Backlog board)
      const plusButtons = wrapper.findAll('.cursor-pointer')
      await plusButtons[0].trigger('click')

      // ASSERT: AddTask component should now appear
      addTaskComponents = wrapper.findAllComponents(AddTask)
      expect(addTaskComponents.length).toBe(1)
    })

    it('should toggle AddTask visibility when clicking Plus multiple times', async () => {
      // ACT: Click Plus button twice
      const plusButtons = wrapper.findAll('.cursor-pointer')
      await plusButtons[0].trigger('click')
      await plusButtons[0].trigger('click')

      // ASSERT: AddTask should be hidden again
      const addTaskComponents = wrapper.findAllComponents(AddTask)
      expect(addTaskComponents.length).toBe(0)
    })
  })

  describe('Task Filtering by Status', () => {
    // NOTE: These tests are tricky because tasks comes from useCollection (Firebase)
    // To properly test filtering logic, you would need to:
    // 1. Create a more sophisticated mock that allows updating the ref
    // 2. Or extract the filtering logic into a pure function and test that
    // 3. Or use integration tests with Firebase emulator

    // For now, we'll test that the computed property exists and works with initial data
    it('should have taskByStatus computed property with all 4 boards', () => {
      const vm = wrapper.vm

      // ASSERT: taskByStatus should have all board categories
      expect(vm.taskByStatus).toHaveProperty('BACKLOG')
      expect(vm.taskByStatus).toHaveProperty('TODO')
      expect(vm.taskByStatus).toHaveProperty('INPROGRESS')
      expect(vm.taskByStatus).toHaveProperty('DONE')
    })

    it('should return empty arrays for all boards when there are no tasks', () => {
      const vm = wrapper.vm

      // ASSERT: All boards should be empty arrays
      expect(Array.isArray(vm.taskByStatus.BACKLOG)).toBe(true)
      expect(vm.taskByStatus.BACKLOG.length).toBe(0)
      expect(vm.taskByStatus.TODO.length).toBe(0)
      expect(vm.taskByStatus.INPROGRESS.length).toBe(0)
      expect(vm.taskByStatus.DONE.length).toBe(0)
    })
  })

  describe('AddTask Integration', () => {
    it('should pass correct board prop to AddTask component', async () => {
      // ACT: Show AddTask for TODO board (second Plus button)
      const plusButtons = wrapper.findAll('.cursor-pointer')
      await plusButtons[1].trigger('click')

      // ASSERT: AddTask should receive 'TODO' as board prop
      const addTask = wrapper.findComponent(AddTask)
      expect(addTask.props('board')).toBe('TODO')
    })
  })

  describe('Empty State', () => {
    it('should render empty boards when there are no tasks', () => {
      // ARRANGE: Component already mounted with empty tasks

      // ASSERT: No TaskCard components should be rendered
      const taskCards = wrapper.findAllComponents(TaskCard)
      expect(taskCards.length).toBe(0)
    })
  })
})

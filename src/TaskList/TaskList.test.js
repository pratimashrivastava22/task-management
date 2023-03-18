import { screen, fireEvent, cleanup, within } from '@testing-library/react';
import TaskList from './TaskList';
import { render } from '../TestUtils'
import { STATUS } from '../utils/constants';
import { ResponsiveGrid } from './TaskList';

afterEach(cleanup)
beforeEach(() => {
    render(
        <TaskList />
    );
    expect(screen.getByText(/Tasks List/i)).toBeInTheDocument();
});

test('Add Task button click should open add task modal', () => {
    const addTaskButton = screen.getByRole('button', { name: /Add Task/i })
    expect(addTaskButton).toBeInTheDocument()
    fireEvent.click(addTaskButton);
    expect(screen.getByTestId('add-task-modal')).toBeInTheDocument()
})

test('Render columns with status as header', () => {
    const listBox = screen.getByTestId('list-box')
    expect(within(listBox).getByText(STATUS[0])).toBeInTheDocument()
})

describe('Render tasks', () => {
    const mockTask = {
        id: parseInt(Math.random() * 100),
        name: 'test task',
        description: 'test description',
        deadline: 'test deadline',
        status: 'TO DO'
    }
    it('It should render task', () => {
        cleanup()
        localStorage.setItem('tasks', JSON.stringify([mockTask]))

        const { getByTestId } = render(<ResponsiveGrid tasks={[mockTask]} setTasks={jest.mock()} />)
        const listBox = getByTestId('list-box')
        expect(listBox).toBeInTheDocument()
        const taskRow = within(listBox).getByTestId(`task-row-${mockTask.id}`)
        expect(taskRow).toBeInTheDocument()
        expect(within(taskRow).getByRole('button', { name: /delete/i })).toBeInTheDocument()

    })
})
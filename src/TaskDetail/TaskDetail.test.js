import { screen, fireEvent, cleanup, within } from '@testing-library/react';
import TaskDetail from './TaskDetail';
import { render } from '../TestUtils'

const mockTask = {
    id: parseInt(Math.random() * 100),
    name: 'test task',
    description: 'test description',
    deadline: 'test deadline',
    status: 'TO DO'
}
afterEach(cleanup)
test('Render Task Detail page', () => {
    localStorage.setItem('selectedTask', JSON.stringify(mockTask))
    render(
        <TaskDetail />,
        { route: `/taskDetail/${mockTask.id}` }
    );
    expect(screen.getByText(mockTask.name)).toBeInTheDocument();
    expect(screen.getByText(mockTask.description)).toBeInTheDocument();
    expect(screen.getByText(mockTask.deadline)).toBeInTheDocument();
});



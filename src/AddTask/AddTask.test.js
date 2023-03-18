import { screen, fireEvent, cleanup, within, act } from '@testing-library/react';
import TaskList from '../TaskList/TaskList';
import { render } from '../TestUtils'
import userEvent from '@testing-library/user-event';

afterEach(cleanup)
beforeEach(() => {
    act(() => render(
        <TaskList />
    ));
    fireEvent.click(screen.getByRole('button', { name: /Add Task/i }));
})
test('Render Add Task Detail Modal', () => {
    expect(screen.getByTestId('add-task-modal')).toBeInTheDocument()
    expect(screen.getByText(/New Task/i)).toBeInTheDocument();
});

test('Should have form with form fields', async () => {
    const nameInputEl = screen.getByRole("textbox", { name: /name/i })
    expect(nameInputEl).toBeInTheDocument();
    userEvent.type(nameInputEl, "test name");

    const descInputEl = screen.getByRole("textbox", { name: /description/i })
    expect(descInputEl).toBeInTheDocument();
    userEvent.type(descInputEl, "test description");

    const deadlineInputEl = screen.getByRole("textbox", { name: /deadline/i })
    expect(deadlineInputEl).toBeInTheDocument();
    userEvent.type(deadlineInputEl, "test deadline");

    const selectEl = screen.getByTestId("select-status")
    expect(selectEl).toBeInTheDocument();
    userEvent.click(selectEl);

    // const optionsPopupEl = await screen.findByRole("listbox", {
    //     name: 'To Do'
    // });

    // Click an option in the popup.
    // userEvent.click(within(optionsPopupEl).getByText(/To Do/i));

    // // Confirm the outcome.
    // expect(await screen.findByText(/To Do/i)).toBeInTheDocument();

    const saveButton = screen.getByRole("button", { name: /save/i })
    expect(saveButton).toBeInTheDocument();
    fireEvent.click(saveButton);
    // expect(spyHandleSave).toBeCalledTimes(1)

    // const cancelButton = screen.getByRole("button", { name: /cancel/i })
    // expect(cancelButton).toBeInTheDocument();

})
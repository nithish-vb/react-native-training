import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddTaskScreen from '../src/screen/AddTaskScreen';
import { TasksProvider } from '../src/context/TaskContent';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'), 
  useNavigation: () => ({
    navigate: mockNavigate, 
  }),
}));

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  }));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ id: '123', title: 'Test Task', description: 'Test Description', created: new Date().toISOString() }),
  })
);

describe('AddTaskScreen', () => {
  beforeEach(() => {

    fetch.mockClear();
    mockNavigate.mockClear();
  });

  it('renders correctly and can enter task details', () => {
    const { getByPlaceholderText } = render(
      <TasksProvider>
        <AddTaskScreen />
      </TasksProvider>
    );

    expect(getByPlaceholderText('Enter Task Title')).toBeTruthy();
    expect(getByPlaceholderText('Enter Task Description')).toBeTruthy();
  });

//   it('allows adding a task and navigating back', async () => {
//     const { getByPlaceholderText, getByText } = render(
//       <TasksProvider>
//         <AddTaskScreen />
//       </TasksProvider>
//     );

//     fireEvent.changeText(getByPlaceholderText('Enter Task Title'), 'New Task');
//     fireEvent.changeText(getByPlaceholderText('Enter Task Description'), 'Do something important.');

//     // Assert that button is present and simulate press
//     const addButton = getByText('Add Task');
//     fireEvent.press(addButton);

//     await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
//     expect(mockNavigate).toHaveBeenCalledWith('Todo'); // Validate that navigate was called correctly
//   });

});
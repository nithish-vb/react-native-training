// Import necessary tools from React Testing Library and Jest
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
// import t from '../src/'
import '@testing-library/jest-native/extend-expect'; // for more matchers like toHaveTextContent

// Import the component to be tested
import CompletedTasksScreen from '../src/screen/CompletedTaskScreen';

// Mock the useTasks context
jest.mock('../src/context/TaskContent', () => ({
  useTasks: jest.fn(),
}));

describe('CompletedTasksScreen', () => {
  // Structure to store your mock tasks
  const tasksMock = [
    {
      id: '1',
      title: 'Test Task 1',
      description: 'Test Description 1',
      created: '2023-01-01',
    },
    {
      id: '2',
      title: 'Test Task 2',
      description: 'Test Description 2',
      created: '2023-01-02',
    },
  ];

  // Mock functions for moving back and deleting tasks
  const moveBackToActiveMock = jest.fn();
  const deleteTaskMock = jest.fn();

  beforeEach(() => {
    // Clear all mocks before each test
    moveBackToActiveMock.mockClear();
    deleteTaskMock.mockClear();

    // Provide return values for your context mock
    require('../src/context/TaskContent').useTasks.mockImplementation(() => ({
      completedTasks: tasksMock,
      moveBackToActive: moveBackToActiveMock,
      deleteTask: deleteTaskMock,
    }));
  });

  it('renders all completed tasks', () => {
    const { getAllByText } = render(<CompletedTasksScreen />);
    // Check if all task titles are rendered
    tasksMock.forEach((task) => {
      expect(getAllByText(task.title)).toBeTruthy();
    });
  });
  
  it('expands and collapses tasks on press', () => {
    const { getByText, queryByText } = render(<CompletedTasksScreen />);

    // Initial state: task descriptions should not be visible
    expect(queryByText(tasksMock[0].description)).toBeNull();

    // Simulate pressing a task
    fireEvent.press(getByText(tasksMock[0].title));

    // After press: task description should be visible
    expect(getByText(tasksMock[0].description)).toBeTruthy();

    // Press again to collapse
    fireEvent.press(getByText(tasksMock[0].title));
    expect(queryByText(tasksMock[0].description)).toBeNull();
  });

  it('calls moveBackToActive with correct id when Reactivate is pressed', () => {
    const { getByText } = render(<CompletedTasksScreen />);
    const taskId = tasksMock[0].id;
    
    // Expand the task to see the Reactivate button
    fireEvent.press(getByText(tasksMock[0].title));
    
    // Simulate pressing the Reactivate button
    fireEvent.press(getByText('Reactivate'));

    // Check if moveBackToActiveMock was called with the correct task id
    expect(moveBackToActiveMock).toHaveBeenCalledWith(taskId);
  });

  it('calls deleteTask with correct id when Delete is pressed', () => {
    const { getByText } = render(<CompletedTasksScreen />);
    const taskId = tasksMock[0].id;
    
    // Expand the task to see the Delete button
    fireEvent.press(getByText(tasksMock[0].title));
    
    // Simulate pressing the Delete button
    fireEvent.press(getByText('Delete'));

    // Check if deleteTaskMock was called with the correct task id
    expect(deleteTaskMock).toHaveBeenCalledWith(taskId);
  });
});
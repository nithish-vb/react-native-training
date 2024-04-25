// TodoScreen.test.js
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { TasksProvider } from '../src/context/TaskContent'; 
import TodoScreen from '../src/screen/TodoSreen';
import fetchMock from 'jest-fetch-mock';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'), 
    useIsFocused: jest.fn(() => true), 
  };
});

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

const mockTasks = [
  { id: '1', title: 'Task 1', description: 'Description 1', created: '2021-01-01' },
  { id: '2', title: 'Task 2', description: 'Description 2', created: '2021-01-02' },
];

const renderWithProvider = (ui, { providerProps, ...renderOptions }) => {
  return render(<TasksProvider {...providerProps}>{ui}</TasksProvider>, renderOptions);
};

it('renders tasks fetched on component mount', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockTasks));

    const { getByText, queryByText } = renderWithProvider(<TodoScreen />, { providerProps: {} });
  
    await waitFor(() => {
      expect(getByText('Task 1')).toBeTruthy();
      expect(getByText('Task 2')).toBeTruthy();
      expect(queryByText('Description 1')).toBeNull();
    });
});


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';
import TodoScreen from './src/screen/TodoSreen';
import AddTaskScreen from './src/screen/AddTaskScreen';
import CompletedTasksScreen from './src/screen/CompletedTaskScreen'; // Import the completed tasks screen
import { TasksProvider } from './src/context/TaskContent';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <TasksProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Todo"
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              switch (route.name) {
                case 'Todo':
                  iconName = focused ? 'list-circle' : 'list-circle-outline';
                  break;
                case 'AddTask':
                  iconName = focused ? 'add-circle' : 'add-circle-outline';
                  break;
                case 'CompletedTasks':
                  iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
                  break;
                default:
                  iconName = 'alert-circle-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Todo" component={TodoScreen} options={{ title: 'Tasks' }} />
          <Tab.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Add Task' }} />
          <Tab.Screen name="CompletedTasks" component={CompletedTasksScreen} options={{ title: 'Completed' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </TasksProvider>
  );
}

export default App;
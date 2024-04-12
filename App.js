import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';
import TodoScreen from './src/screen/TodoSreen';
import AddTaskScreen from './src/screen/AddTaskScreen';
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

              if (route.name === 'Todo') {
                iconName = focused ? 'list-circle' : 'list-circle-outline';
              } else if (route.name === 'AddTask') {
                iconName = focused ? 'add-circle' : 'add-circle-outline';
              } else {
                iconName = focused ? 'add-circle' : 'add-circle-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Todo" component={TodoScreen} options={{ title: 'Task List' }} />
          <Tab.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Add Task' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </TasksProvider>
  );
}

export default App;
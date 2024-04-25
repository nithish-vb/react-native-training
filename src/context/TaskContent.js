import React, { createContext, useState, useContext } from 'react';

const TasksContext = createContext();

export const useTasks = () => useContext(TasksContext);

export const TasksProvider = ({ children }) => {
    // State for active tasks
    const [tasks, setTasks] = useState([{
        //id: 1, title: "Cook", created: new Date().toLocaleString(), description: "Cook healthy food" // Corrected a typo here
    }]);

    // State for completed tasks
    const [completedTasks, setCompletedTasks] = useState([]);

    const moveCompletedTasks = (id) => {
        const taskToMove = tasks.find(task => task.id === id); 
        if (taskToMove) { 
            setTasks(tasks.filter(task => task.id !== id)); 
            setCompletedTasks([...completedTasks, taskToMove]); 
        }
    };

    const moveBackToActive = (id) => {
        const taskToMoveBack = completedTasks.find(task => task.id === id);
        if (taskToMoveBack) {
            setCompletedTasks(completedTasks.filter(task => task.id !== id));
            setTasks([...tasks, { ...taskToMoveBack, created: new Date().toLocaleString() }]);
        }
    };

    const editTask = (editedTask) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === editedTask.id) {
                return { ...task, title: editedTask.title, description: editedTask.description, };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const addTask = (newTask, taskDescription) => {
        setTasks([...tasks, { id: Date.now().toString(), title: newTask, created: new Date().toLocaleString(), description: taskDescription }]);
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id)); 
    };

    return (
        <TasksContext.Provider value={{ tasks, addTask, deleteTask, editTask, moveCompletedTasks, completedTasks,moveBackToActive, setTasks }}>
            {children}
        </TasksContext.Provider>
    );
};
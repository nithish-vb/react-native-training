import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useTasks } from '../context/TaskContent'
import DateTimePicker from '@react-native-community/datetimepicker'

function AddTaskScreen({ navigation }) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const { addTask } = useTasks();

    const handleAddTask = () => {
        if (newTaskTitle&&taskDescription){
        addTask(newTaskTitle, taskDescription);
        setNewTaskTitle('');
        setTaskDescription('')
        navigation.navigate('Todo')  
    }
        
        else {
            Alert.alert(
                "Missing information", 
                "Please enter both a task title and description.", 
                [
                    { text: "OK" } 
                ]
            );
        }
    };


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter Task Title"
                value={newTaskTitle}
                onChangeText={setNewTaskTitle}
            />
            <TextInput
                multiline
                numberOfLines={4}
                style={styles.input}
                placeholder="Enter Task Description"
                value={taskDescription}
                onChangeText={setTaskDescription}
            />
            <Button title="Choose deadline" onPress={() => setOpen(true)} />
            {/* <DateTimePicker
                modal
                open={open}
                value={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            /> */}
            <Button title="Add Task" onPress={handleAddTask} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '80%',
    },
});

export default AddTaskScreen;
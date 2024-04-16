import React, { useState } from 'react';
import { useTasks } from '../context/TaskContent';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

function CompletedTasksScreen() {
    const { completedTasks, moveBackToActive, deleteTask } = useTasks();
    const [expandedTaskId, setExpandedTaskId] = useState(null);

    const handlePress = (id) => {
        setExpandedTaskId(expandedTaskId === id ? null : id);
    };


    const handleMoveBackPress = (id) => {
        moveBackToActive(id);
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={completedTasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handlePress(item.id)}
                        style={styles.taskItem}
                    >
                        <View style={styles.taskContent}>
                            <Text style={styles.taskText}>{item.title}</Text>
                            {expandedTaskId === item.id && (
                                <>
                                    <Text style={styles.descriptionText}>{item.description}</Text>
                                    <Text style={styles.created}>{item.created}</Text>
                                    <View style={styles.row}>
                                        <TouchableOpacity onPress={() => handleMoveBackPress(item.id)} style={styles.moveBackButton}>
                                            <Text style={styles.buttonText}>Reactivate</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteButton}>
                                            <Text style={styles.buttonText}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>

                            )}
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    taskItem: {
        backgroundColor: '#ccc', 
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    
    moveBackButton: {
        backgroundColor: '#FFA500', 
        padding: 10,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default CompletedTasksScreen;
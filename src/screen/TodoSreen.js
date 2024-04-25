import React, { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContent";
import { useIsFocused } from '@react-navigation/native';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  TextInput,
  Button,
} from "react-native";

function TodoScreen() {
  const { tasks, deleteTask, editTask, moveCompletedTasks,setTasks } = useTasks();
  const [expandedTaskId, setExpandedTaskId] = useState(null); 
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState({
    id: null,
    title: "",
    description: "",
  });
  const isFocused = useIsFocused();

  const fetchData = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8080/todos');
      const jsonTodos = await response.json();
      setTasks(jsonTodos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
    };

  useEffect(()=>{
    fetchData()
},[isFocused])

  const handlePress = (id) => {
    if (expandedTaskId === id) {
      setExpandedTaskId(null);
    } else {
      setExpandedTaskId(id);
    }
  };

  const handleEditPress = (task) => {
    setEditingTask({
      id: task.id,
      title: task.title,
      description: task.description,
    });
    setModalVisible(true);
  };

  const handleSubmit = () => {
    editTask(editingTask);
    setModalVisible(false);
  };

  const handleChange = (name, value) => {
    setEditingTask((prev) => ({ ...prev, [name]: value }));
  };

  function deleteTodo(id) {
    fetch(`http://10.0.2.2:8080/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            return response.json(); 
        }
        throw new Error('Delete operation failed.');
    })
    
    .catch(error => console.error('Error:', error));
    fetchData()
}

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
      
        data={tasks}
        keyExtractor={(item,index) => item.id+index}
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
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        onPress={() => handleEditPress(item)}
                        style={styles.editButton}
                      >
                        <Text style={styles.buttonText}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => deleteTodo(item.id)}
                        style={styles.deleteButton}
                      >
                        <Text style={styles.buttonText}>Delete</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => moveCompletedTasks(item.id)}
                        style={styles.endButton}
                      >
                        <Text style={styles.buttonText}>End</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              placeholder="Enter Task Title"
              value={editingTask.title}
              onChangeText={(text) => handleChange("title", text)}
            />
            <TextInput
              multiline
              numberOfLines={4}
              style={styles.input}
              placeholder="Enter Task Description"
              value={editingTask.description}
              onChangeText={(text) => handleChange("description", text)}
            />
            {/* Implement DateTimePicker Here */}
            <Button title="Update Task" onPress={handleSubmit} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#81deea",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  taskContent: {
    flex: 1,
  },
  taskText: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: 'capitalize'
  },

  descriptionText:{
    fontSize:18,
    textTransform: 'capitalize'
  },
  created: {
    fontSize: 14,
    color: "grey",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  editButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  endButton: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
  },
});

export default TodoScreen;

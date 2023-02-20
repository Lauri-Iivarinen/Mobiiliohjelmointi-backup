import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Testing() {

  const [input, setInput] = useState('')
  const [todo, setTodo] = React.useState<string[]>([])

  const addToList = () => {
    setTodo([...todo, input])
    setInput('')
  }

  const listSeparator = () => {
    return (
      <View style={{height: 1, backgroundColor: 'black'}}></View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text>TODO:</Text>
        <TextInput style={styles.inputs} onChangeText={(e) => setInput(e)}>{input}</TextInput>
        <Button title='ADD' onPress={addToList}></Button>
      </View>
      <View style={styles.item}>
        <FlatList
          data={todo}
          renderItem={({ item }) => <Text>{item}</Text>}
          ItemSeparatorComponent={listSeparator}
        ></FlatList>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputs: {
    borderStyle: 'solid',
    borderWidth: 1,
    width: 200
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

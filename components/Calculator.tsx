import React,{useState} from "react";
import { Button, TextInput, View, Text, FlatList, ScrollView, Keyboard } from "react-native";

export default function Calculator({route, navigation} : any) {

    const [firstInput, setFirstInput] = useState('')
    const [secondInput, setSecondInput] = useState('')
    const [result, setResult] = useState('')
    const [history, setHistory] = useState<number[]>([])
    //const history: number[] = []

    const doAddition = () => {
        Keyboard.dismiss()
        const number = (parseInt(firstInput) || 0) + (parseInt(secondInput) || 0)
        setResult('Result: ' + number)
        setHistory([...history, number])
    }

    const doSubstraction = () => {
        Keyboard.dismiss()
        const number = (parseInt(firstInput) || 0) - (parseInt(secondInput) || 0)
        setResult('Result: ' + number)
        setHistory([...history, number])
    }

    return (
        <View style={{flexGrow: 1, justifyContent: 'center'}}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
                <Text>{result}</Text>
                <TextInput style={{ width: 200, borderWidth: 1, marginBottom: 5 }} onChangeText={(e) => setFirstInput(e)} keyboardType='number-pad'>{firstInput}</TextInput>
                <TextInput style={{ width: 200, borderWidth: 1 }} onChangeText={(e) => setSecondInput(e)} keyboardType='number-pad'>{secondInput}</TextInput>
            </View>
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-start'}}>
                <View style={{flexDirection: 'row'}}>
                    <Button title='+' onPress={doAddition}></Button>
                    <Button title='-' onPress={doSubstraction}></Button>
                    <Button title="History" onPress={() => navigation.navigate("CalcHistory", {history: history})}></Button>
                </View>
            </View>
        </View>
    )
}
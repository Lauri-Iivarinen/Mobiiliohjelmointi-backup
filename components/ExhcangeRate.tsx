//O3f0Bf9KleX8AH8sGVjtQRqhOMOXjqAd
import { Picker } from "@react-native-picker/picker";
import React, {useEffect, useState} from "react";
import { Button, TextInput, View, Text, Keyboard } from "react-native";
import {API_KEY} from "@env"

export default function ExchangeRate() {

    const [rates, setRates] = useState<any[]>([]) //[ ["EUR", 1], ["XXX", 0.02] ... ]
    const [keys, setKeys] = useState<String[]>([]) //Currency names for picker
    const [activeCurrency, setActiveCurrency] = useState('') //selected by picker
    const [input, setInput] = useState('') //User input
    const [euros, setEuros] = useState('') //Conversion result
    
    const fetchRates = () => {
        let myHeaders: HeadersInit = new Headers();
        myHeaders.append("apikey", API_KEY); //API_KEY saved in .env file

        fetch("https://api.apilayer.com/exchangerates_data/latest?base=EUR", {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
            })
            .then(response => response.json())
            .then(result => {
                let keyValues = Object.keys(result.rates)
                setKeys(keyValues)
                setRates(Object.entries(result.rates))
                setActiveCurrency(keyValues[0])
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {fetchRates()}, [])

    const doConversion = () => {
        Keyboard.dismiss()
        const currency = rates.find((item) => {
            return item[0] === activeCurrency
        })
        setEuros((parseFloat(input.replace(',','.'))/currency[1]).toFixed(2) + '€')
    }

    return (
        <View style={{flex: 1}}>
            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center',flexDirection: 'row' }}>
                <TextInput style={{width: 200,height: 45, borderWidth: 1}} keyboardType='numeric' onChangeText={(e) => setInput(e)}></TextInput>
                <Picker style={{width: 200}}
                    selectedValue={activeCurrency}
                    onValueChange={(e) => setActiveCurrency(e)}
                >
                {keys.map(item => {
                    return(<Picker.Item key={item+''} label={item + ''} value={item}></Picker.Item>)    
                })}
                </Picker>
            </View>
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <Button title="Convert" onPress={doConversion}></Button>
            </View>
            <View style={{ flex: 3, alignItems:'center' }}>
                <Text style={{fontSize: 35}}>Result: {euros}</Text>
            </View>
        </View>
    )
}
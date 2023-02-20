import React, {useState} from "react";
import { Button, FlatList, Image, Text, TextInput, View } from "react-native";

export default function ReseptiFetch() {

    interface Meal {
        strMeal: string;
        strMealThumb: string;
        idMeal: string;
    }

    const [input, setInput] = useState('') //user input
    const [recipes, setRecipes] = useState<Meal[]>([]) //fetch result

    const fetchRecipes = () => {
        const fetchItem = input.replace(' ', '_') //fetch requests cant handle spaces -> chicken_breast
        fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=' + fetchItem)
            .then(response => response.json())
            .then(data => {
                //console.log(data.meals)
                setRecipes(data.meals)
            })
            .catch(error => console.log(error))
    }
    
    const separator = () => <View style={{backgroundColor: 'black', height: 1, margin: 2}}></View>
    
    return (
        <View style={{ flex: 1 }}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Search recipes</Text>
                <TextInput style={{ borderWidth: 1, width: 200 }} onChangeText={(e) => setInput(e)}></TextInput>
                <Button title="Search" onPress={fetchRecipes}></Button>
            </View>
            <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'center' }}>
                <FlatList
                    data={recipes}
                    renderItem={({ item }) =>
                        <View style={{ flexDirection:'row-reverse', justifyContent:'flex-end'}}>
                            <Text style={{marginLeft: 5}}>{item.strMeal}</Text>
                            <Image source={{uri: item.strMealThumb}} style = {{ width: 150, height: 150 }}></Image>
                        </View>}
                    ItemSeparatorComponent={separator}
                />
            </View>
        </View>
    )
}
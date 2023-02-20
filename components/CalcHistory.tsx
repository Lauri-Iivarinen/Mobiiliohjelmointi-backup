import { FlatList, View, Text } from "react-native";

export default function CalcHistory({ route, navigation }: any) {
    
    const { history } = route.params

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>History:</Text>
            <FlatList
                data={history}
                renderItem={({ item }) => <Text>{item}</Text>}
            ></FlatList>
        </View>
    )
}
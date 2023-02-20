import React, {useState, useEffect} from "react";
import { ActivityIndicator, Button, FlatList, Text, TextInput, View } from "react-native";

export default function GhFetch() {

    interface Response {
        total_count: number;
        incomplete_results: boolean;
        items: any[];
    }

    //https://api.github.com/search/repositories?q={keyword}
    const [response, setResponse] = useState<Response>()
    const [keyword, setKeyword] = useState('')
    const [loading, setLoading] = useState<boolean>(false)

    const fetchRepos = () => {
        setLoading(true)
        fetch('https://api.github.com/search/repositories?q=' + keyword)
            .then(response => response.json())
            .then(data => {
                setResponse({ total_count: data.total_count, incomplete_results: data.incomplete_results, items: data.items })
                setLoading(false)
            })
            .catch(error => console.log(error))
    }

    const listSeparator = () => {
        return (<View style={{ height: 1, backgroundColor: 'grey', marginLeft: 10, marginRight: 10 }} />)
    }
    
    return (
        <View style={{flex: 1}}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Search GitHub repositories:</Text>
                <TextInput style={{ borderWidth: 1, width: 200 }} onChangeText={(e) => setKeyword(e)}>{keyword}</TextInput>
                <Button onPress={fetchRepos} title="Fetch"></Button>
            </View>
            <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'center' }}>
                <ActivityIndicator size="small" animating={loading}></ActivityIndicator>
                <FlatList
                    data={response?.items}
                    renderItem={({ item }) =>
                        <View style={{ marginLeft: 10, marginRight: 10 }}>
                            <Text>{item.full_name}</Text>
                            <Text>{item.description}</Text>
                        </View>}
                    ItemSeparatorComponent={listSeparator}
                >
                </FlatList>
            </View>
        </View>
    );
}
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function ShoppingList() {

    return (
        <View style={styles.containerBase}>
            <View style={styles.upper}></View>
            <View style={styles.lower}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerBase: {
        flex: 1,
        flexDirection: 'row'
    },
    upper: {
        flex: 1,
        backgroundColor: 'blue'
    },
    lower: {
        flex: 1,
        backgroundColor: 'green'
    }
})
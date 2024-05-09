import TodoEntity from "@/model/TodoEntity";
import { useDatabase } from "@nozbe/watermelondb/react";
import { router } from "expo-router";
import { ToastAndroid } from "react-native";
import Clipboard from '@react-native-clipboard/clipboard';
import { Card, IconButton, TouchableRipple, Text } from "react-native-paper";

export default function TodoItem(props: { todo: TodoEntity }) {
  const database = useDatabase();
  return <Card style={{
    height: 100,
    overflow: 'hidden',
  }} mode='outlined' >
    <TouchableRipple style={{
      height: "100%",
      width: "100%",
    }}
      onLongPress={() => {
        Clipboard.setString(props.todo.content);
        ToastAndroid.show("Copied to Clipboard 📋", ToastAndroid.SHORT);
      }}
      onPress={() => {
        router.push(`/details/${props.todo.id}`)
      }} >
      <Card.Content style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%",
      }} >
        <Text style={{
          flex: 1,
          paddingVertical: 12
        }} variant="bodyLarge">{props.todo.content}</Text>
        <IconButton style={{
          alignSelf: "center"
        }} icon="delete" onPress={async () => {
          await database.write(async () => {
            await props.todo.destroyPermanently();
          })
        }} />
      </Card.Content>
    </TouchableRipple>
  </Card>
}

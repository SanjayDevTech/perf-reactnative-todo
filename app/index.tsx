
import { Appbar, FAB, Surface, Text, useTheme } from 'react-native-paper';
import { FlatList, StyleSheet, View } from 'react-native';
import { router, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { compose, withDatabase, withObservables } from '@nozbe/watermelondb/react';
import { Database } from '@nozbe/watermelondb';
import TodoEntity from '@/model/TodoEntity';
import { Observable } from '@nozbe/watermelondb/utils/rx';
import TodoItem from '@/components/TodoItem';

export default function HomeScreen() {
  const theme = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return (
    <Surface style={{
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.colors.surface,
      position: "relative",
      width: "100%",
      height: "100%"
    }}>
      <Appbar.Header>
        <Appbar.Content title="Todo Test App" />
      </Appbar.Header>
      <EnhancedTodoList />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push("details")}
      />
    </Surface>
  )
}

function TodoList(props: { todos: TodoEntity[] }) {
  return <FlatList
    contentContainerStyle={{
      height: "100%",
      width: "100%",
    }}
    keyExtractor={(item) => item.id}
    data={props.todos}
    ItemSeparatorComponent={() => <View style={{
      height: 8,
    }} />}
    ListEmptyComponent={() => <View style={{
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Text style={{
        textAlign: "center"
      }}>No records available</Text>
    </View>}
    renderItem={({ item: todo }) => (<TodoItem todo={todo} key={todo.id} />)} style={{
      paddingHorizontal: 16
    }} />;
}

const enhance = withObservables([], (props: { database: Database }) => ({
  todos: props.database.get('todos').query().observe() as Observable<TodoEntity[]>,
}));

const EnhancedTodoList = compose<(props: { todos: TodoEntity[] }) => React.ReactNode, any, () => React.ReactNode>(
  withDatabase, enhance,
)(TodoList);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})


import { Appbar, FAB, Surface, Text, TextInput, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import TodoEntity from '@/model/TodoEntity';
import { compose, useDatabase, withDatabase, withObservables } from '@nozbe/watermelondb/react';
import { Database, Q } from '@nozbe/watermelondb';
import { Observable } from '@nozbe/watermelondb/utils/rx';
import { useState } from 'react';

const enhance = withObservables([], (props: { database: Database, id: string }) => ({
  todo: props.database.get<TodoEntity>('todos').findAndObserve(props.id),
}));

export const EnhancedDetailsScreenContent = withDatabase(enhance(DetailsScreenContent))

export default function DetailsScreenContent(props: {
  todo?: TodoEntity,
}) {
  const theme = useTheme();
  const database = useDatabase();

  const [content, setContent] = useState(props.todo?.content ?? "");
  const isEditMode = Boolean(props.todo);
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
        <Appbar.BackAction onPress={router.back} />
        <Appbar.Content title={`${isEditMode ? "Update" : "Add"} Todo`} />
      </Appbar.Header>

      <TextInput mode='outlined' value={content} onChangeText={setContent} multiline dense collapsable contentStyle={{
        height: "100%",
      }} style={{
        flex: 1,
        paddingVertical: 12,
        marginHorizontal: 8,
      }} />
      <FAB
        icon="check"
        style={styles.fab}
        onPress={async () => {
          if (!content.trim()) return;
          await database.write(async () => {
            if (props.todo) {
              await props.todo.update(todo => {
                todo.content = content;
              });
            } else {
              await database.get<TodoEntity>("todos").create(todo => {
                todo.content = content;
              });
            }
          })
          router.back();
        }}
      />
    </Surface>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})


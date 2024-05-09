import { Model } from '@nozbe/watermelondb';
import { text } from '@nozbe/watermelondb/decorators'

export default class Todo extends Model {
  static table = 'todos';

  @text("content") content!: string;
}

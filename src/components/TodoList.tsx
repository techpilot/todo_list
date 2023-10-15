import { MouseEventHandler } from 'react';
import CopyIcon from './utils/icons/CopyIcon';
import DeleteIcon from './utils/icons/DeleteIcon';
import MarkIcon from './utils/icons/MarkIcon';

interface MyComponentProps {
  listItem: TodoState;
  setTodoList: React.Dispatch<React.SetStateAction<TodoState[]>>;
}

interface TodoState {
  id: string;
  text: string;
  read: boolean;
}

const TodoList: React.FC<MyComponentProps> = ({ listItem, setTodoList }) => {
  const deleteTodoItem: MouseEventHandler<Element> = () => {
    const todoList: string | null = localStorage.getItem('todoList') ?? '';
    const existingTodoList: TodoState[] =
      todoList?.length > 0 ? JSON.parse(todoList) : [];

    const updatedItem = existingTodoList.filter(
      (item) => item?.id !== listItem?.id
    );

    localStorage.setItem('todoList', JSON.stringify(updatedItem));
    setTodoList(updatedItem);
  };

  const markAsRead: MouseEventHandler<Element> = () => {
    const todoList: string | null = localStorage.getItem('todoList') ?? '';
    const existingTodoList: TodoState[] =
      todoList?.length > 0 ? JSON.parse(todoList) : [];

    const updatedItem = existingTodoList?.map((item) => {
      if (item?.id === listItem?.id) {
        return { ...item, read: true };
      }
      return item;
    });

    localStorage.setItem('todoList', JSON.stringify(updatedItem));
    setTodoList(updatedItem);
  };

  return (
    <div
      className={
        listItem?.read ? 'item-wrapper item-wrapper-read' : 'item-wrapper'
      }
    >
      <div className="todo-item">
        <img className="todo-icon" src="/src/assets/icon.png" alt="" />
        <p
          className={
            listItem?.read ? 'todo-item-text todo-item-read' : 'todo-item-text'
          }
        >
          {listItem?.text}
        </p>
      </div>
      <div className="todo-actions-wrapper">
        <div onClick={deleteTodoItem}>
          <DeleteIcon />
        </div>

        <div onClick={markAsRead}>
          <MarkIcon />
        </div>
        <CopyIcon />
      </div>
    </div>
  );
};

export default TodoList;

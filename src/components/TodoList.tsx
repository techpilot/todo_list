import { MouseEventHandler, useState } from 'react';
import img from '../assets/icon.png';
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
  completed: boolean;
  category: string;
  date: string;
}

const TodoList: React.FC<MyComponentProps> = ({ listItem, setTodoList }) => {
  const [copyId, setCopyId] = useState<string>('');

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
        return { ...item, completed: true };
      }
      return item;
    });

    localStorage.setItem('todoList', JSON.stringify(updatedItem));
    setTodoList(updatedItem);
  };

  const copyToClipboard: MouseEventHandler<Element> = () => {
    navigator.clipboard
      .writeText(listItem?.text)
      .then(() => {
        return setCopyId(listItem?.id);
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
  };

  setTimeout(() => {
    setCopyId('');
  }, 1000);

  return (
    <div
      className={
        listItem?.completed ? 'item-wrapper item-wrapper-read' : 'item-wrapper'
      }
    >
      <div className="todo-item">
        <img className="todo-icon" src={img} alt="" />
        <div className="item-time-wrapper">
          <span
            className={
              listItem?.completed
                ? 'todo-item-text todo-item-read'
                : 'todo-item-text'
            }
          >
            {listItem?.text}
          </span>
          <span className="item-time">{listItem?.date}</span>
        </div>
      </div>
      <div className="todo-actions-wrapper">
        <div onClick={deleteTodoItem}>
          <DeleteIcon />
        </div>

        <div onClick={markAsRead}>
          <MarkIcon />
        </div>

        <div
          onClick={copyToClipboard}
          className={copyId == listItem?.id ? 'clicked-effect' : ''}
        >
          <CopyIcon />
        </div>
      </div>
    </div>
  );
};

export default TodoList;

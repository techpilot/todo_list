import { MouseEventHandler } from 'react';
import CopyIcon from './utils/icons/CopyIcon';
import DeleteIcon from './utils/icons/DeleteIcon';
import MarkIcon from './utils/icons/MarkIcon';

interface MyComponentProps {
  id: string;
  text: string;
  setTodoList: React.Dispatch<React.SetStateAction<TodoState[]>>;
}

interface TodoState {
  id: string;
  text: string;
}

const TodoList: React.FC<MyComponentProps> = ({ id, text, setTodoList }) => {
  console.log(id);

  const deleteTodoItem: MouseEventHandler<Element> = () => {
    const todoList: string | null = localStorage.getItem('todoList') ?? '';
    const existingTodoList: TodoState[] =
      todoList?.length > 0 ? JSON.parse(todoList) : [];

    const deleteItem = existingTodoList.filter((item) => item.id !== id);

    localStorage.setItem('todoList', JSON.stringify(deleteItem));
    setTodoList(deleteItem);
    console.log(deleteItem);
  };

  return (
    <div className="item-wrapper">
      <div className="todo-item">
        <img className="todo-icon" src="/src/assets/icon.png" alt="" />
        <p className="todo-item-text">{text}</p>
      </div>
      <div className="todo-actions-wrapper">
        <div onClick={deleteTodoItem}>
          <DeleteIcon />
        </div>
        <MarkIcon />
        <CopyIcon />
      </div>
    </div>
  );
};

export default TodoList;

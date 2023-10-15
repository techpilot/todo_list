import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import '../styles/Todo.css';
import TodoList from './TodoList';

interface TodoState {
  id: string;
  text: string;
  read: boolean;
}

const Todo = () => {
  const [input, setInput] = useState<string>('');
  const [todoList, setTodoList] = useState<TodoState[]>([]);

  const getExistingList = (): TodoState[] => {
    const eList: string | null = localStorage.getItem('todoList') ?? '';
    const existingList: TodoState[] =
      eList?.length > 0 ? JSON.parse(eList) : [];
    return existingList;
  };

  const addTodo: MouseEventHandler<Element> = () => {
    if (input) {
      const existingList = getExistingList();
      existingList.unshift({
        id: Math.floor(Math.random() * 10000).toString(),
        text: input,
        read: false,
      });

      localStorage.setItem('todoList', JSON.stringify(existingList));
      setTodoList(existingList);
      setInput('');
    }
  };

  const handleChange: ChangeEventHandler<Element> = (event: ChangeEvent) => {
    const elem = event.target as HTMLTextAreaElement;
    setInput(elem.value);
  };

  useEffect(() => {
    const todoList: string | null = localStorage.getItem('todoList') ?? '';
    const existingTodoList: TodoState[] =
      todoList?.length > 0 ? JSON.parse(todoList) : [];
    setTodoList(existingTodoList);
  }, []);

  return (
    <div className="todo-container">
      <p className="todo-title">Let's make plans for today</p>

      <div className="todo-input-wrapper">
        <input
          placeholder="Add item"
          value={input}
          onChange={handleChange}
          className="add-todo-input"
        />
        <button onClick={addTodo} className="add-button">
          Add Todo
        </button>
      </div>

      <div className="todo-input-wrapper">
        <input placeholder="Search items" className="search-input" />
      </div>

      <div className="todo-items-container">
        {todoList?.map((item) => (
          <TodoList listItem={item} setTodoList={setTodoList} />
        ))}
      </div>
    </div>
  );
};

export default Todo;

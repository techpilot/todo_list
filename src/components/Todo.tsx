import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import TodoList from './TodoList';
import './styles/Todo.css';

interface TodoState {
  id: string;
  text: string;
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
    const existingList = getExistingList();
    existingList.unshift({
      id: Math.floor(Math.random() * 10000).toString(),
      text: input,
    });
    localStorage.setItem('todoList', JSON.stringify(existingList));
    setTodoList(existingList);
    setInput('');
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
        {todoList?.map((list) => (
          <TodoList id={list?.id} text={list?.text} setTodoList={setTodoList} />
        ))}
      </div>
    </div>
  );
};

export default Todo;

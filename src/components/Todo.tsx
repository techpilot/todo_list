import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import '../styles/Todo.css';
import Search from './Search';
import TodoList from './TodoList';
import SelectComponent from './utils/reusables/SelectComponent';

interface TodoState {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  date: string;
}

const options: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
  month: 'short',
  day: 'numeric',
  year: 'numeric',
};

const Todo = () => {
  const [input, setInput] = useState<string>('');
  const [todoList, setTodoList] = useState<TodoState[]>([]);
  const [categoryState, setCategoryState] = useState<string>('All');

  const getExistingList = (): TodoState[] => {
    const eList: string | null = localStorage.getItem('todoList') ?? '';
    const existingList: TodoState[] =
      eList?.length > 0 ? JSON.parse(eList) : [];
    return existingList;
  };

  const addTodo: MouseEventHandler<Element> = () => {
    const formattedDate: string = new Intl.DateTimeFormat(
      'en-US',
      options
    ).format(Date.now());

    if (input) {
      const existingList = getExistingList();
      existingList.unshift({
        id: Math.floor(Math.random() * 10000).toString(),
        text: input,
        completed: false,
        category: categoryState == 'All' ? 'Others' : categoryState,
        date: formattedDate,
      });

      localStorage.setItem('todoList', JSON.stringify(existingList));
      setTodoList(existingList);
      setInput('');
      setCategoryState('All');
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
      <p className="todo-title">TODO LIST</p>

      <div className="main-wrapper">
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

        <SelectComponent
          disabled={false}
          elements={['All', 'Work', 'Read', 'Others']}
          categoryState={categoryState}
          setCategoryState={setCategoryState}
          setTodoList={setTodoList}
        />
      </div>

      <Search setTodoList={setTodoList} setCategoryState={setCategoryState} />

      {todoList?.length > 0 && (
        <div className="todo-items-container">
          {todoList?.map((item) => (
            <TodoList listItem={item} setTodoList={setTodoList} />
          ))}
        </div>
      )}

      {todoList?.length === 0 && (
        <p>{`No Todo in ${categoryState} Category`}</p>
      )}
    </div>
  );
};

export default Todo;

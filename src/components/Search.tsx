import { ChangeEvent, ChangeEventHandler, useState } from 'react';

interface SelectComponentProps {
  setTodoList: React.Dispatch<React.SetStateAction<TodoState[]>>;
  setCategoryState: React.Dispatch<React.SetStateAction<string>>;
}

interface TodoState {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  date: string;
}

const Search: React.FC<SelectComponentProps> = ({
  setTodoList,
  setCategoryState,
}) => {
  const [searchterm, setSearchTerm] = useState<string>('');

  const handleSearch: ChangeEventHandler<Element> = (event: ChangeEvent) => {
    const elem = event.target as HTMLTextAreaElement;
    setSearchTerm(elem.value);
    setCategoryState('All');

    const todoList: string | null = localStorage.getItem('todoList') ?? '';
    const existingTodoList: TodoState[] =
      todoList?.length > 0 ? JSON.parse(todoList) : [];

    const result = existingTodoList?.filter((item) =>
      item.text.toLowerCase().includes(searchterm.toLowerCase())
    );

    if (elem.value) {
      setTodoList(result);
    } else {
      setTodoList(existingTodoList);
    }
  };

  return (
    <div className="search-input-wrapper">
      <input
        value={searchterm}
        onChange={handleSearch}
        placeholder="Search todo items"
        className="search-input"
      />
    </div>
  );
};

export default Search;

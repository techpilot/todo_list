import { ChangeEvent, ChangeEventHandler, useState } from 'react';

interface SelectComponentProps {
  setTodoList: React.Dispatch<React.SetStateAction<TodoState[]>>;
}

interface TodoState {
  id: string;
  text: string;
  read: boolean;
  category: string;
}

const Search: React.FC<SelectComponentProps> = ({ setTodoList }) => {
  const [searchterm, setSearchTerm] = useState<string>('');

  const handleSearch: ChangeEventHandler<Element> = (event: ChangeEvent) => {
    const elem = event.target as HTMLTextAreaElement;
    setSearchTerm(elem.value);

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
        placeholder="Search items"
        className="search-input"
      />
    </div>
  );
};

export default Search;

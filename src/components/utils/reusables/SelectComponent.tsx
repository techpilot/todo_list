import '../../../styles/SelectStyles.css';

interface SelectComponentProps {
  disabled: boolean;
  elements: string[];
  categoryState: string;
  setCategoryState: React.Dispatch<React.SetStateAction<string>>;
  setTodoList: React.Dispatch<React.SetStateAction<TodoState[]>>;
}

interface TodoState {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  date: string;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  disabled,
  elements,
  categoryState,
  setCategoryState,
  setTodoList,
}) => {
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newValue = event.target.value;
    setCategoryState(newValue);

    const todoList: string | null = localStorage.getItem('todoList') ?? '';
    const existingTodoList: TodoState[] =
      todoList?.length > 0 ? JSON.parse(todoList) : [];

    const updatedTodo = existingTodoList.filter(
      (item) => item?.category === newValue
    );

    if (newValue == 'All') {
      setTodoList(existingTodoList);
    } else {
      setTodoList(updatedTodo);
    }
  };

  return (
    <div className="main-container">
      <div className="select-wrapper">
        <select
          id="select"
          value={categoryState}
          onChange={handleCategoryChange}
          className="select"
          disabled={disabled}
        >
          {elements?.map((element, index) => (
            <option key={index}>
              <p>{element}</p>
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectComponent;

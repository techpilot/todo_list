import CopyIcon from './utils/icons/CopyIcon';
import DeleteIcon from './utils/icons/DeleteIcon';
import MarkIcon from './utils/icons/MarkIcon';

interface MyComponentProps {
  id: string;
  list: string;
}

const TodoList: React.FC<MyComponentProps> = ({ id, list }) => {
  console.log(id);

  return (
    <div className="item-wrapper">
      <div className="todo-item">
        <img className="todo-icon" src="/src/assets/icon.png" alt="" />
        <p className="todo-item-text">{list}</p>
      </div>
      <div className="todo-actions-wrapper">
        <DeleteIcon />
        <MarkIcon />
        <CopyIcon />
      </div>
    </div>
  );
};

export default TodoList;

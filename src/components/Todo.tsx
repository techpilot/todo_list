import './styles/Todo.css';
import CopyIcon from './utils/icons/CopyIcon';
import DeleteIcon from './utils/icons/DeleteIcon';
import MarkIcon from './utils/icons/MarkIcon';

const Todo = () => {
  return (
    <div className="todo-container">
      <p className="todo-title">Let's make plans for today</p>

      <div className="todo-input-wrapper">
        <input placeholder="Add item" className="add-todo-input" />
        <button className="add-button">Add Todo</button>
      </div>

      <div className="todo-input-wrapper">
        <input placeholder="Search items" className="search-input" />
      </div>

      <div className="todo-items-container">
        <div className="item-wrapper">
          <div className="todo-item">
            <img className="todo-icon" src="/src/assets/icon.png" alt="" />
            <p className="todo-item-text">
              Item coming home Item coming home Item home{' '}
            </p>
          </div>
          <div className="todo-actions-wrapper">
            <DeleteIcon />
            <MarkIcon />
            <CopyIcon />
          </div>
        </div>

        <div className="item-wrapper">
          <div className="todo-item">
            <img className="todo-icon" src="/src/assets/icon.png" alt="" />
            <p className="todo-item-text">
              Item coming home Item coming home Item home{' '}
            </p>
          </div>
          <div className="todo-actions-wrapper">
            <DeleteIcon />
            <MarkIcon />
            <CopyIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;

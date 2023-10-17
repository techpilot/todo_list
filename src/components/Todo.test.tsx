import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import Todo from './Todo';

describe('Todo Component', () => {
  it('renders the component', () => {
    render(<Todo />);
    const todoTitle = screen.getByText('TODO LIST');
    expect(todoTitle).toBeInTheDocument();
  });

  it('adds a new todo', () => {
    render(<Todo />);
    const addTodoButton = screen.getByText('Add Todo');
    const inputElement = screen.getByPlaceholderText('Add item');
    const todoText = 'New Todo';

    fireEvent.change(inputElement, { target: { value: todoText } });
    fireEvent.click(addTodoButton);

    const addedTodo = screen.getByText(todoText);
    expect(addedTodo).toBeInTheDocument();
  });

  it('selects a category', () => {
    render(<Todo />);
    const categorySelector = screen.getByText('All');
    fireEvent.click(categorySelector);
    const workCategory = screen.getByText('Urgent');
    fireEvent.click(workCategory);
    const selectedCategory = screen.getByText('Urgent');
    expect(selectedCategory).toBeInTheDocument();
  });

  it('performs search', () => {
    render(<Todo />);
    const searchInput = screen.getByPlaceholderText('Search todo items');
    const todoText = 'New Todo';

    fireEvent.change(searchInput, { target: { value: todoText } });

    const searchedTodo = screen.getByText(todoText);
    expect(searchedTodo).toBeInTheDocument();
  });
});

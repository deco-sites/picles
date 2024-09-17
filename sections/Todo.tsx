import { useState } from 'preact/hooks';

interface Props {
  /**
   * @format rich-text
   */
  title?: string;
  /**
   * @format textarea
   */
  placeholder?: string;
  /**
   * @format color-input
   */
  backgroundColor?: string;
  /**
   * @format color-input
   */
  textColor?: string;
}

export default function TodoList({
  title = "Todo List",
  placeholder = "Add a new todo",
  backgroundColor = "#ffffff",
  textColor = "#000000"
}: Props) {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, newTodo]);
      setNewTodo("");
    }
  };

  const toggleTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index] = newTodos[index].startsWith("✓ ") 
      ? newTodos[index].slice(2) 
      : "✓ " + newTodos[index];
    setTodos(newTodos);
  };

  return (
    <div class="p-6 rounded-lg shadow-lg" style={{ backgroundColor, color: textColor }}>
      <h2 class="text-2xl font-bold mb-4 text-center">{title}</h2>
      <ul class="mb-4">
        {todos.map((todo, index) => (
          <li key={index} class="flex items-center mb-2">
            <button
              onClick={() => toggleTodo(index)}
              class="w-6 h-6 rounded-full border-2 border-current mr-2 flex items-center justify-center"
            >
              {todo.startsWith("✓ ") && "✓"}
            </button>
            <span class={todo.startsWith("✓ ") ? "line-through" : ""}>{todo.replace("✓ ", "")}</span>
          </li>
        ))}
      </ul>
      <div class="flex">
        <input
          type="text"
          value={newTodo}
          onInput={(e) => setNewTodo((e.target as HTMLInputElement).value)}
          placeholder={placeholder}
          class="flex-grow p-2 border rounded-l-lg"
          style={{ backgroundColor: "transparent", borderColor: textColor }}
        />
        <button
          onClick={addTodo}
          class="px-4 py-2 rounded-r-lg"
          style={{ backgroundColor: textColor, color: backgroundColor }}
        >
          Add Todo
        </button>
      </div>
    </div>
  );
}
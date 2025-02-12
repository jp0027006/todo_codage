import Button from "./Button";
import {Todo} from "@/services/todoService"

interface TodoCardProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggleCompleted: (id: number, completed: boolean) => void;
  onViewClick: (todo: Todo) => void;
}

const TodoCard = ({
  todo,
  onDelete,
  onToggleCompleted,
  onViewClick,
}: TodoCardProps) => {
  return (
    <div
      key={todo.id}
      className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl"
    >
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">{todo.title}</h3>
          <span
            className={`inline-block px-2 py-1 text-sm rounded-md ${
              todo.completed
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {todo.completed ? "Completed" : "Pending"}
          </span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <Button
              onClick={() => onViewClick(todo)}
              className="py-2 px-4 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg mr-2 hover:bg-blue-600 hover:text-white"
            >
              View
            </Button>
            <Button
              onClick={() => onDelete(todo.id)}
              className="py-2 px-4 text-sm font-medium text-red-600 border border-red-600 rounded-lg mr-2 hover:bg-red-600 hover:text-white"
            >
              Delete
            </Button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => onToggleCompleted(todo.id, e.target.checked)}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;

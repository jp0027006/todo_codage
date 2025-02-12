import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TodoView from "@/components/TodoDetail/TodoView";

const TodoDetail = () => {

  return (
    <div className="min-h-screen bg-white py-20">
      <ToastContainer position="bottom-right" autoClose={2000} />
      <TodoView />
    </div>
  );
};

export default TodoDetail;

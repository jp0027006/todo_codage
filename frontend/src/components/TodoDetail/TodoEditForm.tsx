"use client";
import { ChangeEvent } from "react";
import { useRouter } from "next/navigation";

interface TodoEditFormProps {
  title: string;
  description: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  handleUpdate: () => void;
}

const TodoEditForm = ({
  title,
  description,
  setTitle,
  setDescription,
  handleUpdate,
}: TodoEditFormProps) => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center">
      <div className="w-[500px] bg-white bg-opacity-50">
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg w-[500px]">
          <h3 className="text-xl font-semibold mb-4">Edit Todo</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 mr-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoEditForm;

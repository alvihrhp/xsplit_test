import React, { useEffect, useState } from "react";
/** Services */
import { TodoService } from "./services";
/** Components */
import { Card, Form, Modal } from "./components";
/** Images */
import Background from "./assets/bg-black.webp";
/** Third Party Library */
import classnames from "classnames";
import Swal from "sweetalert2";

interface Props {}

const App: React.FC<Props> = () => {
  const [todos, setTodos] = useState<{ [key: string]: any }[]>([]);

  const [todo, setTodo] = useState<{ [key: string]: any }>({});

  const [modalUpdate, setModalUpdate] = useState<boolean>(false);

  const [inputs, setInputs] = useState<{ [key: string]: any }[]>([
    {
      label: "Task Name",
      name: "name",
      id: "name",
      value: "",
      type: "text",
    },
    {
      label: "Task Description",
      name: "description",
      id: "description",
      value: "",
      type: "textarea",
    },
  ]);

  const [updateInputs, setUpdateInputs] = useState<{ [key: string]: any }[]>([
    ...inputs,
  ]);

  const submitForm = async (e: any): Promise<void> => {
    e.preventDefault();
    try {
      const newTask = {
        name: inputs[0].value,
        description: inputs[1].value,
        isCompleted: false,
      };

      const result: any = await TodoService.create(newTask);

      console.log("masuk result", result);

      setTodos([...todos, result]);

      Swal.fire({
        icon: "success",
        title: "Your new task has been created",
        showConfirmButton: false,
        timer: 1500,
      });

      const resetInput = inputs.map((input: { [key: string]: any }) => ({
        ...input,
        value: "",
      }));

      setInputs(resetInput);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: error,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const fetchData = async () => {
    try {
      const result: any = await TodoService.fetch();

      setTodos(result);
    } catch (error) {
      console.log(error);
    }
  };

  const completeTask = async (id: number) => {
    try {
      const result: any = await TodoService.complete(id);

      const newTodos = todos.map((todo: { [key: string]: any }) => {
        if (todo.id === result.id) {
          return {
            ...result,
          };
        }
        return {
          ...todo,
        };
      });

      setTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const openingModalUpdate = (data: { [key: string]: any }) => {
    const newUpdateInputs = [
      { ...updateInputs[0], value: data.name },
      { ...updateInputs[1], value: data.description },
    ];

    setTodo(data);

    setUpdateInputs(newUpdateInputs);

    setModalUpdate(true);
  };

  const closeModalUpdate = () => {
    const newUpdateInputs = [
      { ...inputs[0], value: "" },
      { ...inputs[1], value: "" },
    ];

    setTodo({});

    setUpdateInputs(newUpdateInputs);

    setModalUpdate(false);
  };

  const updateForm = async (e: any): Promise<void> => {
    e.preventDefault();
    try {
      const data = {
        name: updateInputs[0].value,
        description: updateInputs[0].value,
        isCompleted: todo.isCompleted,
      };

      const result = await TodoService.update(data, todo.id);

      const newTodos = todos.map((todo: { [key: string]: any }) => {
        if (todo.id === result.id) {
          return {
            ...result,
          };
        }
        return {
          ...todo,
        };
      });

      setTodos(newTodos);

      Swal.fire({
        icon: "success",
        title: "Your task has been updated",
        showConfirmButton: false,
        timer: 1500,
      });

      closeModalUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const swalResult = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (swalResult.isConfirmed) {
        const result: any = await TodoService.delete(id);

        const newTodos = todos.filter(
          (todo: { [key: string]: any }) => todo.id !== result.id
        );

        setTodos(newTodos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-screen h-screen relative overflow-y-hidden">
      {modalUpdate && updateInputs[0].value && (
        <Modal>
          <div className="w-full h-full flex flex-wrap justify-center items-center">
            <Card style="py-3 px-4 bg-cyan-400 rounded shadow-md shadow-cyan-400 w-[600px] relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 absolute top-[12px] right-[16px] cursor-pointer"
                onClick={() => closeModalUpdate()}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <Form
                inputs={updateInputs}
                setInputs={setUpdateInputs}
                submitForm={updateForm}
                btnName="Update Task"
              ></Form>
            </Card>
          </div>
        </Modal>
      )}
      <img className="absolute top-0 left-0 opacity-[.88]" src={Background} />
      <div className="flex flex-wrap w-full h-full justify-between py-6 relative z-10">
        <div className="w-[35%] px-2">
          <Card style="py-3 px-4 bg-cyan-400 rounded shadow-lg shadow-cyan-400 w-full">
            <Form
              inputs={inputs}
              setInputs={setInputs}
              submitForm={submitForm}
              btnName="Create Task"
            ></Form>
          </Card>
        </div>
        <div className="w-[65%] h-[100%] pl-5 pr-2 overflow-y-scroll">
          <div className="flex flex-col">
            {todos.length > 0 &&
              todos.map((todo: { [key: string]: any }, todoIdx: number) => (
                <Card
                  style="py-3 px-4 bg-cyan-400 rounded shadow-lg shadow-cyan-400 w-full mb-5"
                  key={todoIdx}
                >
                  <h1 className="font-bold text-lg text-neutral-200 mb-2">
                    {todo.name}
                  </h1>
                  <p className="font-medium text-medium mb-2">
                    {todo.description}
                  </p>
                  <span
                    className={classnames("font-bold", {
                      ["text-green-700"]: todo.isCompleted,
                      ["text-rose-700"]: !todo.isCompleted,
                    })}
                  >
                    {todo.isCompleted
                      ? "Task is completed"
                      : "Task not yet completed"}
                  </span>
                  <div className="flex flex-wrap w-full justify-between mt-5 px-3">
                    <button
                      type="button"
                      className="bg-indigo-600 text-white rounded py-2 px-5"
                      onClick={() => completeTask(todo.id)}
                    >
                      Complete
                    </button>
                    <button
                      type="button"
                      className="bg-yellow-600 text-white rounded py-2 px-5"
                      onClick={() => openingModalUpdate(todo)}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="bg-rose-600 text-white rounded py-2 px-5"
                      onClick={() => deleteTask(todo.id)}
                    >
                      Delete
                    </button>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

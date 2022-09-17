import { fetchHelper } from "../helper";

class TodoService {
  static async fetch() {
    try {
      const response = await fetchHelper(
        `${process.env.REACT_APP_BASE_URL}/todo-get`,
        "GET"
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }
  static async create(data: { [key: string]: any }) {
    try {
      const response = await fetchHelper(
        `${process.env.REACT_APP_BASE_URL}/todo-add`,
        "POST",
        data
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
  static async complete(id: number) {
    try {
      const response = await fetchHelper(
        `${process.env.REACT_APP_BASE_URL}/todo-complete/${id}`,
        "PATCH"
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }
  static async update(data: { [key: string]: any }, id: number) {
    try {
      const response = await fetchHelper(
        `${process.env.REACT_APP_BASE_URL}/todo-update/${id}`,
        "PUT",
        data
      );

      return response;
    } catch (error) {
      throw error;
    }
  }
  static async delete(id: number) {
    try {
      const response = await fetchHelper(
        `${process.env.REACT_APP_BASE_URL}/todo-delete/${id}`,
        "DELETE"
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export default TodoService;

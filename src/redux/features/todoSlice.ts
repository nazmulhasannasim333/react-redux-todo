import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TTodo = {
  id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
};

type TInitialState = {
  todos: TTodo[];
};
const initialState: TInitialState = {
  todos: [],
};
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TTodo>) => {
      state.todos.push({ ...action.payload, isCompleted: false });
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const task = state.todos.find((item) => item.id === action.payload);
      if (task) {
        task.isCompleted = !task.isCompleted;

        state.todos.sort((a, b) => {
          if (a.isCompleted && !b.isCompleted) return 1;
          if (!a.isCompleted && b.isCompleted) return -1;
          return 0;
        });
      }
    },
    updateTodo: (state, action: PayloadAction<TTodo>) => {
      const { id, title, description, isCompleted } = action.payload;
      const task = state.todos.find((item) => item.id === id);
      if (task) {
        (task.title = title),
          (task.description = description),
          (task.isCompleted = isCompleted);
      }
    },
  },
});

export const { addTodo, removeTodo, toggleComplete, updateTodo } =
  todoSlice.actions;

export default todoSlice.reducer;

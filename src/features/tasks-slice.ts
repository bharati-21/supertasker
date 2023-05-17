import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

type TaskState = {
  entities: Task[];
};

type DraftTask = RequireOnly<Task, 'title'>;

const createTask = (draftTask: DraftTask): Task => {
  return {
    id: nanoid(),
    ...draftTask,
  };
};

const initialState: TaskState = {
  entities: [],
};

const tasksSlice = createSlice({
  initialState,
  name: 'tasks',
  reducers: {
    addTask: (state, action: PayloadAction<DraftTask>) => {
      const task = createTask(action.payload);
      state.entities.unshift(task);
    },
    removeTask: (state, action: PayloadAction<Task['id']>) => {
      const index = state.entities.findIndex(task => task.id === action.payload);
      state.entities.splice(index, 1);
    },
  },
});

export const {
  actions: { addTask, removeTask },
  reducer: tasksReducer,
} = tasksSlice;

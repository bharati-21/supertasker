import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit';
import { removeUser } from './users-slice';

type TaskState = {
  loading?: boolean;
  entities: Task[];
};

type DraftTask = RequireOnly<Task, 'title'>;

export const createTask = (draftTask: DraftTask): Task => {
  return {
    id: nanoid(),
    ...draftTask,
  };
};

const initialState: TaskState = {
  entities: [],
  loading: false,
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTask',
  async (): Promise<Task[]> => {
    const response = await fetch('/api/tasks').then((res) => res.json());
    return response.tasks;
  },
);

const tasksSlice = createSlice({
  initialState,
  name: 'tasks',
  reducers: {
    addTask: (state, action: PayloadAction<DraftTask>) => {
      const task = createTask(action.payload);
      state.entities.unshift(task);
    },
    removeTask: (state, action: PayloadAction<Task['id']>) => {
      const index = state.entities.findIndex(
        (task) => task.id === action.payload,
      );
      state.entities.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeUser, (state, action) => {
        const userId = action.payload;
        for (const task of state.entities) {
          if (task.user === userId) {
            task.user = undefined;
          }
        }
      })
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.loading = false;
      });
  },
});

export const {
  actions: { addTask, removeTask },
  reducer: tasksReducer,
} = tasksSlice;

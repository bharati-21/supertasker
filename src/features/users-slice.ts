import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import data from '../api/data.json';

type UserState = {
  entities: User[];
};

const initialState: UserState = {
  entities: data.users,
};

type DraftUser = RequireOnly<User, 'realName' | 'alterEgo'>;

const createUser = (draftUser: DraftUser): User => {
  return {
    id: nanoid(),
    tasks: [],
    ...draftUser,
  };
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<DraftUser>) => {
      const user = createUser(action.payload);
      state.entities.push(user);
    },
    removeUser: (state, action: PayloadAction<string>) => {
      const index = state.entities.findIndex((u) => u.id === action.payload);
      state.entities.splice(index, 1);
    },
  },
});

export const {
  actions: { addUser, removeUser },
  reducer: usersReducer,
} = usersSlice;

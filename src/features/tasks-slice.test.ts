import exp from 'constants';
import { addTask, createTask, removeTask, tasksReducer } from './tasks-slice';

describe('tasksSlice', () => {
  const initialState = {
    entities: [
      createTask({
        title: 'Write tests',
      }),
      createTask({
        title: 'Make tests pass',
      }),
    ],
  };
  it('should add a task when the action is called', () => {
    const newTask = createTask({
      title: 'make add tests pass',
    });

    const action = addTask(newTask);
    const newState = tasksReducer(initialState, action);

    expect(newState.entities).toHaveLength(3);
    expect(newState.entities).toEqual([newTask, ...initialState.entities]);
  });

  it('should remove a task when the action is called with id', () => {
    const idToRemove: string = initialState.entities[0].id;
    const action = removeTask(idToRemove);
    const newState = tasksReducer(initialState, action);
    expect(newState.entities).toHaveLength(1);
    expect(newState.entities).toEqual(initialState.entities.splice(1));
  });
});

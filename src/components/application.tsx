import { useAppSelector } from '../hooks';
import CreateTask from './create-task';
import TaskList from './task-list';
import UserList from './user-list';

const Application = () => {
  const { loading } = useAppSelector((state) => state.tasks);

  return (
    <main className="application">
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <div className="side-panel">
            <CreateTask />
            <UserList />
          </div>
          <TaskList />
        </>
      )}
    </main>
  );
};

export default Application;

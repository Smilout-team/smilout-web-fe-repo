import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div>
      <h1>Public Layout</h1>
      <Outlet />
    </div>
  );
};

export default PublicLayout;

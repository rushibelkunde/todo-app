
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './Home';
import Register from './Register';
import Login from './Login';



const router = createBrowserRouter(
  [
    { path: "/", element: <Home /> },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> }

  ]
  ,
  // {basename: "todo-app"}
  
)

function App() {
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  );
}

export default App;

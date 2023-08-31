import './App.css';
import { RouterProvider } from 'react-router-dom';
import useRoute from './utils/useRoute';
import { Provider } from 'react-redux';
import store from './utils/store';

function App() {
  const appRouter=useRoute();  
  return (
    <Provider store={store}>
    <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;

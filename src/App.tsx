import { RouterProvider } from 'react-router-dom'
import './App.css'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { router } from './routes'
import AuthInitializer from './services/authInitialization'


function App() {

  return (
    <Provider store={store}>
      <AuthInitializer>
        <RouterProvider router={router} />
      </AuthInitializer>
    </Provider>
  )
}

export default App

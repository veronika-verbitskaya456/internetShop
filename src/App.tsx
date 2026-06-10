import './App.css'
import SignInPage from './pages/SignInPage/SignInPage'
import { store } from './store/store'
import { Provider } from 'react-redux'

function App() {

  return (
    <Provider store={store}>
      <SignInPage />
    </Provider>

  )
}

export default App

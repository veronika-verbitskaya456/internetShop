import './App.css'
import Header from './components/Header/Header'
import MainPage from './pages/MainPage/MainPage'
import SignInPage from './pages/SignInPage/SignInPage'
import { store } from './store/store'
import { Provider } from 'react-redux'

function App() {

  return (
    <Provider store={store}>
      {/* <SignInPage /> */}
      <MainPage/>
    </Provider>

  )
}

export default App

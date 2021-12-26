import { LoginBox } from './components/LoginBox'
import { MessageList } from './components/MessageList'
import styles from './styles/app.module.scss'


function App() {
  return (
   <main className={styles.contentWrapper}>
     <MessageList/>
     <LoginBox/>
   </main>
  )
}

export default App

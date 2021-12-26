import { useContext } from 'react'
import { LoginBox } from './components/LoginBox'
import { MessageList } from './components/MessageList'
import { SendMessageForm } from './components/SendMessageForm'
import { AuhtContex } from './contexts/auth'
import styles from './styles/app.module.scss'


function App() {
  
   const {user}=useContext(AuhtContex) 
  
  
  return (
   <main className={`${styles.contentWrapper} ${!!user?styles.contentSigned:''}`}>
     <MessageList/>
     {!!user?<SendMessageForm/>:<LoginBox/>}
     
   </main>
  )
}

export default App

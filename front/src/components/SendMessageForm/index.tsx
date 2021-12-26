import { FormEvent, useContext, useState } from 'react'
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc'
import { AuhtContex } from '../../contexts/auth'
import { api } from '../../services/api'
import styles from './styles.module.scss'

export function SendMessageForm(){
    const {user,signOut}=useContext(AuhtContex)
    const [txtMessage,setTxtMessage]=useState('')
    
    const sendMessage=async(event:FormEvent)=>{
        event.preventDefault()
        if(!txtMessage.trim())
            return
        
            await api.post('messages',{message:txtMessage})


            setTxtMessage('')
    }
    
    return(
       <div className={styles.sendMessageFormWrapper}>
           <button onClick={signOut} className={styles.signOutButton}>
               <VscSignOut size="32px"/>
           </button>
           <header className={styles.userInformation}>
                <div className={styles.userImage}>
                    <img src={user?.avatar_url} alt={user?.name}/>
                </div>
                <strong className={styles.userName}>{user?.name}</strong>
                <span className={styles.userGithub}>
                    <VscGithubInverted size="16"/>
                    {user?.login}
                </span>
           </header>
           <form onSubmit={sendMessage} className={styles.sendMessageForm}>
                <label htmlFor='message'>Mensagem</label>
                <textarea
                    name="message"
                    id="message"
                    placeholder='Qual sua expectativa para o evento?'
                    onChange={(e)=>setTxtMessage(e.target.value)}
                    value={txtMessage}

                />
                {console.log(txtMessage)}
                <button type='submit'>Enviar Mensagem</button>
           </form>
       </div>
    )
}
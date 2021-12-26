import styles from './styles.module.scss'
import {VscGithubInverted} from 'react-icons/vsc'
import { useContext} from 'react'
import { AuhtContex } from '../../contexts/auth'



export function LoginBox()
{
    const { singInUrl}=useContext(AuhtContex)
    return(
        <div className={styles.loginBoxWrapper}>
            <strong>Entre e compartilhe sua mensagem</strong>
            <a href={singInUrl} className={styles.signInWithGithub}>
                <VscGithubInverted size="24" />
                Entrar com github
            </a>
        </div>
    )
}
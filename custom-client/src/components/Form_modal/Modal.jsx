import styles from './Modal.module.css';
import { useHistory } from 'react-router-dom';

const Modal = ({ display, bg_color, data, setModal }) => {
  const history = useHistory();
  const handleClose = () => {
    setModal(state => ({ ...state, active: false }))
  }
  return (
    <div className={styles.modal_bg} hidden={display}>
      <div className={`${styles.modal_container} ${styles[bg_color]}`}>
        <button hidden={data.status} className={styles.modal_close} onClick={handleClose}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>

        </button>
        <p>{data.message}</p>
        <div className={styles.btns_container}>
          <button className={`button`} onClick={()=>history.push('/home')}>Go home</button>
          <button hidden={!data.status} onClick={()=>history.push(`/game/${data.game.id}`)} className={`button`}>Go to detail</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
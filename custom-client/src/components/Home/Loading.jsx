import styles from './Home.module.css'

const Loading = () => {
  return (
    <div className={styles.wait_sign_container}>
      <h2>Wait while we bring out our games from the shadow realm...</h2>
      <img src="../../../4765-snakeroll.gif" alt="gif" className={styles.spinner}/>
    </div>
  )
}

export default Loading
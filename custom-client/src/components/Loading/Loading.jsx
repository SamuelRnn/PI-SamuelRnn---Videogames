import styles from './Loading.module.css'

const Loading = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.wait_sign_container}>
        <h2>Wait while we bring back our data from the shadow realm...</h2>
        <img src="../../../snakeroll.gif" alt="gif" className={styles.spinner}/>
      </div>
    </div>
  )
}

export default Loading
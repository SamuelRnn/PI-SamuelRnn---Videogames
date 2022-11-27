import styles from './Loading.module.css'

const Loading = () => {
  return (
    <div className={styles.wait_sign_container}>
      <h2>Wait while we bring out our data from the shadow realm...</h2>
      <img src="../../../snakeroll.gif" alt="gif" className={styles.spinner}/>
    </div>
  )
}

export default Loading
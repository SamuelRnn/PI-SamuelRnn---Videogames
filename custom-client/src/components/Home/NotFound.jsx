import styles from './NotFound.module.css'

const NotFound = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.content}>
        <h1>Not Results</h1>
        <svg  className={styles.robot} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m20 4h-2v-1h2.5c.28 0 .5.22.5.5v2c0 .28-.22.5-.5.5h-.5v1h-1v-2h1zm-1 5h1v-1h-1zm-2-6h-1v4h1zm6 12v3c0 .55-.45 1-1 1h-1v1c0 1.11-.89 2-2 2h-14c-1.1 0-2-.89-2-2v-1h-1c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1h1c0-3.87 3.13-7 7-7h1v-1.27c-.6-.34-1-.99-1-1.73 0-1.1.9-2 2-2s2 .9 2 2c0 .74-.4 1.39-1 1.73v1.27h1c.34 0 .67.03 1 .08v2.92h4.74c.79 1.13 1.26 2.5 1.26 4h1c.55 0 1 .45 1 1m-13 .5c0-1.38-1.12-2.5-2.5-2.5s-2.5 1.12-2.5 2.5 1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5m9 0c0-1.38-1.12-2.5-2.5-2.5s-2.5 1.12-2.5 2.5 1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5m-2-7.5h-1v1h1z"/></svg>
          <div className={styles.info_container}>
            <p>Try to reset the filters and search with a button like this</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={styles.btn_ref}>
                <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
          </div>
      </div>
    </div>
  )
}

export default NotFound;
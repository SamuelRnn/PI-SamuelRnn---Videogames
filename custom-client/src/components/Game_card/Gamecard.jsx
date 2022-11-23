import styles from './Gamecard.module.css'

const Gamecard = (props) => {
  return (
    <div className={styles.container}>
      <h3>{props.name}</h3>
      <div className={styles.img_container} style={{"backgroundImage": `url(${props.background_image})`}}></div>
      <p>genres: {props.genres.map(genre => genre.name).join(', ')}</p>
    </div>
  )
}

export default Gamecard
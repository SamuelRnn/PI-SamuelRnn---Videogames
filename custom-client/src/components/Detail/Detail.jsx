import { useState } from 'react';
import { useEffect } from 'react';
import services from '../../services'
import styles from './Detail.module.css';
import Loading from '../Loading/Loading';
import { useHistory } from 'react-router-dom';

const Detail = ({ match }) => {
  const {id} = match.params;
  const [info, setInfo] = useState('');
  const history = useHistory()
  useEffect(()=>{
    services.getGameDetail(id).then(res => setInfo(res))
  },[]);
  return (
    <>
      {
        info
        ? <div className={styles.main_container}>
            <div className={styles.img_container} style={{backgroundImage: `url(${info.background_image})`}}>
            </div>
            <div className={styles.description_container}>
              <h1>{info.name}</h1>
              <div dangerouslySetInnerHTML={{ __html: info.description }}></div>
            </div>
            <div className={styles.extra_data_container}>
              <h2>Game Info</h2>
              <ul>
                <li><strong>Release Date:</strong> {info.released.split("-").reverse().join("/")}</li>
                <li><strong>Genres:</strong> {info.genres.map(g => g.name).join(", ")}</li>
                <li><strong>Developers:</strong> {info.developers ? info.developers.map(dev => dev.name).join(", ") : "N/A"}</li>
                <li><strong>General Rating:</strong> {info.rating}</li>
                <li><strong>Metacritic Score:</strong> {info.metacritic}</li>
                <li><strong>Platforms:</strong> {info.platforms ? info.platforms.map(p => p.platform.name).join(" - ") : "N/A"}</li>
              </ul>
            </div>
          </div>
        : <Loading/>
      }
    </>
  )
  
}
export default Detail;
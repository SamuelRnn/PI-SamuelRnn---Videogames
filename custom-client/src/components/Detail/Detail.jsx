import { useState } from 'react';
import { useEffect } from 'react';
import services from '../../services'
import styles from './Detail.module.css';
import Loading from '../Loading/Loading';
import { useHistory } from 'react-router-dom';

const Detail = ({ match }) => {
  const {id} = match.params;
  const [info, setInfo] = useState('');
  const history = useHistory();
  const image_fallback = '../../../dante.webp'

  useEffect(()=>{
    services.getGameDetail(id).then(res => setInfo(res))
  },[]);
  return (
    <>
      {
        info
        ? <div className={styles.main_container}>
            <div className={styles.img_container} style={{backgroundImage: `url(${info.background_image || image_fallback})`}}>
            </div>
            <div className={styles.description_container}>
              <div className={styles.title_container}>
                <h1>{info.name}</h1>
                <a onClick={()=>history.push('/home')}>Return Home</a>
              </div>
              {
                !isNaN(id) ? 
                <div dangerouslySetInnerHTML={{ __html: info.description || '<p>Not Specified</p>' }}></div> :
                <p>{info.description}</p>
              }
            </div>
            <div className={styles.extra_data_container}>
              <ul>
                <li><strong>Release Date:</strong> {info.released ? info.released.split("-").reverse().join("/") : "N/A"}</li>
                <li><strong>Genres:</strong> {info.genres.map(g => g.name).join(", ") || "Not Specified"}</li>
                <li><strong>Developers:</strong> {info.developers ? info.developers.map(dev => dev.name).join(", ") : "N/A"}</li>
                <li><strong>General Rating:</strong> {info.rating ? info.rating + " / 5" : "N/A"}</li>
                <li><strong>Metacritic Score:</strong> {info.metacritic || "N/A"}</li>
                {
                  !info.platforms[0]?.platform
                    ? <li><strong>Platforms:</strong> {info.platforms ? info.platforms.join(", ") : "N/A"}</li>
                    : <li><strong>Platforms:</strong> {info.platforms ? info.platforms.map(p => p.platform.name).join(", ") : "N/A"}</li>
                }
              </ul>
            </div>
          </div>
        : <Loading/>
      }
    </>
  )
  
}
export default Detail;
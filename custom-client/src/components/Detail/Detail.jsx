import { useState } from "react";
import { useEffect } from "react";
import services from "../../services";
import styles from "./Detail.module.css";
import Loading from "../Loading/Loading";
import { useHistory } from "react-router-dom";

const Detail = ({ match }) => {
  const { id } = match.params;
  const [info, setInfo] = useState("");
  const history = useHistory();
  const image_fallback = "../../../dante.webp";

  useEffect(() => {
    services.getGameDetail(id).then((res) => setInfo(res));
  }, []);
  return (
    <>
      {info ? (
        <div className={styles.main_container}>
          <div
            className={styles.img_container}
            style={{
              backgroundImage: `url(${
                info.background_image || image_fallback
              })`,
            }}
          ></div>
          <div className={styles.description_container}>
            <div className={styles.title_container}>
              <h1>{info.name}</h1>
              <a className='button' onClick={() => history.push("/home")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
              </a>
            </div>
            {!isNaN(id) ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: info.description || "<p>Not Specified</p>",
                }}
              ></div>
            ) : (
              <p>{info.description}</p>
            )}
          </div>
          <div className={styles.extra_data_container}>
            <ul>
              <li>
                <strong>Release Date:</strong>{" "}
                {info.released
                  ? info.released.split("-").reverse().join("/")
                  : "N/A"}
              </li>
              <li>
                <strong>Genres:</strong>{" "}
                {info.genres.map((g) => g.name).join(", ") || "Not Specified"}
              </li>
              <li>
                <strong>Developers:</strong>{" "}
                {info.developers
                  ? info.developers.map((dev) => dev.name).join(", ")
                  : "N/A"}
              </li>
              <li>
                <strong>General Rating:</strong>{" "}
                {info.rating ? info.rating + " / 5" : "N/A"}
              </li>
              <li>
                <strong>Metacritic Score:</strong> {info.metacritic || "N/A"}
              </li>
              {!info.platforms[0]?.platform ? (
                <li>
                  <strong>Platforms:</strong>{" "}
                  {info.platforms ? info.platforms.join(", ") : "N/A"}
                </li>
              ) : (
                <li>
                  <strong>Platforms:</strong>{" "}
                  {info.platforms
                    ? info.platforms.map((p) => p.platform.name).join(", ")
                    : "N/A"}
                </li>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};
export default Detail;

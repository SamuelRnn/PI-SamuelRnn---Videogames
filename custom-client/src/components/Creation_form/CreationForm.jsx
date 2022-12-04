import styles from "./Creationform.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import services from "../../services";
import {  resetGames } from "../../redux/actions";
import Modal from "../Form_modal/Modal";

const CreationForm = () => {
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  const platforms = [
    "PC",
    "Linux",
    "Xbox One",
    "PlayStation 4",
    "PlayStation 5",
    "Wii U",
    "Nintendo Switch",
    "Mac OS",
    "iOS",
    "Nintendo 3DS",
    "Android",
    "Steam Deck",
  ];
  const initialForm = {
    name: "",
    description: "",
    released: ["", "", ""],
    rating: "",
    genres: [],
    platforms: [],
  }
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState({
    name: false,
    description: false,
    released: false,
    rating: false,
  });
  const [modal, setModal] = useState({
    active: false,
    status: "",
    message: "",
  });
  //--------------------------------------
  const handleSelection = (event) => {
    event.preventDefault();
    const { id, name } = event.target;

    const selectionExist = form[name].find((g) => g === id);
    if (selectionExist) {
      return setForm((state) => ({
        ...state,
        [name]: state[name].filter((s) => s !== selectionExist),
      }));
    }
    if (id === "clear-all") {
      setForm((state) => ({ ...state, [name]: [] }));
    } else {
      if (form[name].length === 4) return;
      setForm((state) => ({
        ...state,
        [name]: [...new Set(state[name].concat(id))],
      }));
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    const newDate = [form.released[0], form.released[1], form.released[2]];

    if (name === "day") {
      newDate[0] = value;
      return setForm((state) => ({ ...state, released: newDate }));
    }
    if (name === "month") {
      newDate[1] = value;
      return setForm((state) => ({ ...state, released: newDate }));
    }
    if (name === "year") {
      newDate[2] = value;
      return setForm((state) => ({ ...state, released: newDate }));
    }
    setForm((state) => ({ ...state, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    services.postCustomGame({...form})
      .then((res) => setModal({ ...res, active: true }))
    dispatch(resetGames());
  };
  //modal handle ----------------------------------
  useEffect(() => {
    if(modal.status){
      window.sessionStorage.clear();
      setForm(initialForm);
    }
  }, [modal]);
  //form validation and form helpers-------------------------------
  useEffect(() => {
    if(form.released[0].length !== 2 || form.released[1].length !== 2 || form.released[2].length !== 4){      
      if(form.released[0].length === 2){
        const month = document.getElementById('month');
        month.focus();
      }
      if(form.released[1].length === 2){
        const year = document.getElementById('year');
        year.focus();
      }
    }

    if(form.rating.length === 1) {
      setForm(state => ({ ...state, rating: form.rating + '.' }) )
    }
    setError(services.validateCreationForm(form));
  }, [form]);

  return (
    <>
      <Modal
        display={!modal.active}
        bg_color={modal.status ? "bg-green" : "bg-red"}
        data={modal}
        setModal={setModal}
      />

      <div className={styles.main_container}>
        <div className={styles.form_container}>
          <h2>Create your game</h2>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <input
              value={form.name}
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="name (max. 52 characters)"
              maxLength="52"
            />
            {error.name && <p>Write a valid name (at least 4 characters)</p>}

            <textarea
              value={form.description}
              onChange={handleChange}
              name="description"
              placeholder="description (max. 255 characters)"
              maxLength="255"
            ></textarea>
            {error.description && (
              <p>Write a valid description (at least 30 characters)</p>
            )}

            <div className={styles.numeric_fields}>
              <div className={styles.date_field}>
                <label>release date (DD-MM-YYYY)</label>
                <div className={styles.date_container}>
                  <input
                    value={form.released[0]}
                    onChange={handleChange}
                    placeholder="day"
                    type="text"
                    name="day"
                    maxLength="2"
                  />

                  <input
                    value={form.released[1]}
                    onChange={handleChange}
                    placeholder="month"
                    id="month"
                    type="text"
                    name="month"
                    maxLength="2"
                  />

                  <input
                    value={form.released[2]}
                    onChange={handleChange}
                    placeholder="year"
                    id="year"
                    type="text"
                    name="year"
                    maxLength="4"
                  />
                </div>
                {error.released && <p>Invalid Date</p>}
              </div>

              <div className={styles.rating_field}>
                <label>rating (e.g. 4.38)</label>
                <input
                  value={form.rating}
                  maxLength="4"
                  onChange={handleChange}
                  name="rating"
                  type="text"
                  placeholder="0.00"
                />
                {error.rating && <p>Invalid rating, use numbers only and use a valid format</p>}
              </div>
            </div>

            <label>genres (max. 4, at least 1)</label>
            <div className={styles.selection_container}>
              <button name="genres" onClick={handleSelection} id="clear-all">
                Clear All
              </button>
              {genres.map((g) => (
                <button
                  name="genres"
                  className={
                    +form.genres[0] === g.id ||
                    +form.genres[1] === g.id ||
                    +form.genres[2] === g.id ||
                    +form.genres[3] === g.id
                      ? styles.active_genre
                      : null
                  }
                  onClick={handleSelection}
                  id={g.id}
                  key={g.id}
                >
                  {g.name}
                </button>
              ))}
            </div>

            <label>platforms (max. 4, at least 1)</label>
            <div className={styles.selection_container}>
              <button name="platforms" onClick={handleSelection} id="clear-all">
                Clear All
              </button>
              {platforms.map((p) => (
                <button
                  name="platforms"
                  className={
                    form.platforms[0] === p ||
                    form.platforms[1] === p ||
                    form.platforms[2] === p ||
                    form.platforms[3] === p
                      ? styles.active_genre
                      : null
                  }
                  onClick={handleSelection}
                  id={p}
                  key={p}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              disabled={
                error.name ||
                error.description ||
                error.released ||
                error.rating ||
                !form.name ||
                !form.description ||
                !form.released[0] ||
                !form.released[1] ||
                !form.released[2] ||
                !form.rating ||
                !form.platforms.length ||
                !form.genres.length
              }
              className={`button ${styles.submit}`}
              type="submit"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreationForm;

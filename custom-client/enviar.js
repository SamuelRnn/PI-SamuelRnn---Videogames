import axios from "axios";
const coso = "C:/Users/ricar/Imágenes/urahara.png"
const form = {
  // media: "C:/Users/ricar/Imágenes/urahara.png",
  key: '000026634d9a4460a3cc05d1af7e862c'
}
axios.post('https://thumbsnap.com/api/upload', form, {
  headers: {
    "Content-Type": "multipart/form-data",
  }
}).then(res => console.log(res.data)).catch(err => console.log(err.response.data))
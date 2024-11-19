import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "7715c9da9bd14cdf9a496c55f7b5e223",
  },
});

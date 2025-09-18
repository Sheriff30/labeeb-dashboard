import axios from "axios";

export const getFiles = async () => {
  try {
    const data = await axios.get("/data/files.json");
    return data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching files");
  }
};

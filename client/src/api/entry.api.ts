import axios, { AxiosResponse } from "axios";
import { UserEntryRequestDto } from "./dto";
import { SERVER_ENDPOINT } from "./constants";
import { QueryType } from "../global/types";

const addEntry = async (dto: UserEntryRequestDto) => {
  const res: AxiosResponse = await axios.post(
    `${SERVER_ENDPOINT}/entries`,
    dto,
    { withCredentials: true }
  );
  return res.data;
};

const fetchEntry = async (query?: QueryType) => {
  const queryString = new URLSearchParams(query || {}).toString();
  const res: AxiosResponse = await axios.get(
    `${SERVER_ENDPOINT}/entries?${queryString}`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

const entryAPI = {
  addEntry,
  fetchEntry,
};

export default entryAPI;

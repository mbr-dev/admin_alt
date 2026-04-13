//import { useMemo } from "react";
import axios from "axios";
//import { useLocation } from "react-router";
import { GetError } from "@/data/constants";
import { useStorage } from "../";

const url = import.meta.env.VITE_BASEAPI;
const url_local = import.meta.env.VITE_LOCALAPI;
const apiType = import.meta.env.VITE_APITYPE;
const url_files = import.meta.env.VITE_BASEURL;

export function useApi() {
  const { getData } = useStorage();
  //const { search } = useLocation();

  //const token = useMemo(() => new URLSearchParams(search).get("token"), [search]);
  const token = getData("token");

  const get_error = (error: unknown) => GetError(error);

  const returnApi = () => {
    switch (apiType) {
      case "dev":
        return `${url}apidev/`;
      case "local":
        return url_local;
      default:
        return `${url}/`;
    }
  };

  const api = axios.create({
    baseURL: returnApi(),
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  return { api, URL: url, URL_FILES: url_files, get_error };
}

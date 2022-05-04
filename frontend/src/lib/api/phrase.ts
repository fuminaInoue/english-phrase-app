import client from "lib/api/client"
import { Phrase } from "interfaces/index"
import Cookies from "js-cookie"

export const getPhrase = () => {
  return client.get("phrases", { headers: {
    "access-token": Cookies.get("_access_token")||'',
    "client": Cookies.get("_client")||'',
    "uid": Cookies.get("_uid")||''
  }})
}

export const getRandomPhrase = () => {
  return client.get("/phrases/random", { headers: {
    "access-token": Cookies.get("_access_token")||'',
    "client": Cookies.get("_client")||'',
    "uid": Cookies.get("_uid")||''
  }})
}

export const createPhrase = (data: Phrase) => {
  return client.post("phrases", data)
}

export const patchPhrase = (data: Phrase) => {
  return client.patch(`/phrases/${data.id}`, data)
}

export const deletePhrase = (id: number) => {
  return client.delete(`/phrases/${id}`)
}
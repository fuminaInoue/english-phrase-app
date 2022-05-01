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

export const createPhrase = (data: Phrase) => {
  return client.post("phrases", data)
}
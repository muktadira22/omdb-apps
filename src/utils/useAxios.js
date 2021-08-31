import axios from "axios";
import useUrlBuilder from "./useUrlBuilder";

const UseAxios = ({ params, successCb, failedCb = () => { }, completeCb = () => { } }) => {
  axios.get(useUrlBuilder(), {
    params
  }).then(res => {
    successCb(res)
  }).catch(err => {
    failedCb(err)
  }).then(() => {
    completeCb()
  })
}

export default UseAxios
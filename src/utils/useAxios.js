import axios from "axios";
import Paginate from "./paginate";
import useUrlBuilder from "./useUrlBuilder";

const UseAxios = ({ params, successCb, failedCb = () => { }, completeCb = () => { } }) => {
  axios.get(useUrlBuilder(), {
    params
  }).then(res => {
    let data = res.data
    if (data.Response === "True") {
      if (params.hasOwnProperty('page')) {

        let paginate = Paginate(data.totalResults, params.page, 10, 10)
        return successCb({
          page: paginate.currentPage,
          pageSize: 10,
          total: parseInt(paginate.totalItems),
          totalPages: paginate.totalPages,
          results: data.Search
        })
      }
      return successCb(res.data)
    } else {
      return failedCb({
        message: data.Error
      })
    }

  }).catch(err => {
    failedCb(err)
  }).then(() => {
    completeCb()
  })
}

export default UseAxios
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import useAxios from '../../utils/useAxios';
import MovieContext from "./context";
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MovieProvider = ({ children }) => {
  const [open, setOpen] = React.useState({
    isOpen: false,
    message: "",
  })

  const [listMovie, setListMovie] = React.useState({})

  const [myList, setMyList] = React.useState([])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen((prev) => ({
      ...prev,
      isOpen: false
    }))
  };

  const getMovieByName = (name, page = 1) => {
    if (name !== "" || name !== null) {
      useAxios({
        params: {
          s: name,
          page
        },
        successCb: (data) => {
          setListMovie(data)
          setOpen((prev) => ({
            ...prev,
            isOpen: false,
          }))
        },
        failedCb: (err) => {
          setListMovie({})
          setOpen((prev) => ({
            ...prev,
            isOpen: true,
            message: err.message
          }))
        }
      })
    }
  }

  const addToList = (data) => {
    setMyList([...myList, data])
  }

  const removeToList = (data) => {
    let id = data.imdbID
    let dataArray = myList
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].imdbID === id) {
        dataArray.splice(i, 1)
        break;
      }
    }
    setMyList(dataArray)
  }

  return (
    <MovieContext.Provider value={{
      listMovie,
      myList,
      getMovieByName: getMovieByName,
      addToList,
      removeToList,
    }}>
      {children}
      <Snackbar open={open.isOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {open.message}
        </Alert>
      </Snackbar>
    </MovieContext.Provider>

  )
}

export default MovieProvider

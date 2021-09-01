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
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen((prev) => ({
      ...prev,
      isOpen: false
    }))
  };
  const [state, setState] = React.useState({
    upcoming: {
      data: [],
      total: 0
    },
    myList: []
  })

  const getMovieByName = (name, page = 1) => {
    if (name !== "" || name !== null) {
      useAxios({
        params: {
          s: name,
          page
        },
        successCb: (res) => {
          let data = res.data
          if (data.Response === "True") {
            setState((prev) => ({
              ...prev,
              upcoming: {
                ...prev.upcoming,
                data: data.Search,
                total: data.totalResults
              }
            }))
          } else {
            setOpen((prev) => ({
              ...prev,
              isOpen: true,
              message: data.Error
            }))
          }
        },
      })
    }
  }

  const addToList = (data) => {
    setState((prev) => ({
      ...prev,
      myList: [...prev.myList, data]
    }))
  }

  const removeToList = (data) => {
    let id = data.imdbID
    let dataArray = state.myList
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].imdbID === id) {
        dataArray.splice(i, 1)
        break;
      }
    }
    setState((prev) => ({
      ...prev,
      myList: dataArray
    }))
  }

  // React.useEffect(() => {
  //   // Get Upcoming Movie

  // }, [])
  return (
    <MovieContext.Provider value={{
      state,
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

/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import useAxios from "../../utils/useAxios";
import MovieContext from "./context";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MovieProvider = ({ children }) => {
  const [open, setOpen] = React.useState({
    isOpen: false,
    message: "",
  });

  const [listMovie, setListMovie] = React.useState({});

  const [myList, setMyList] = React.useState([]);

  // Function for handle close alert
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  // Function for update localStorage
  const updateLocalStorage = (data) => {
    window.localStorage.setItem("my_list", JSON.stringify(data));
  };

  const checkInMyList = (data) => {
    if (data.length > 0)
      data.map((item, key) => {
        item.isFavorited = false;
        let find = myList.find((element) => element.imdbID === item.imdbID);
        if (find) {
          item.isFavorited = true;
        }
        return item;
      });
    return data;
  };

  const getMovieByName = (name, page = 1) => {
    if (name !== "" || name !== null) {
      useAxios({
        params: {
          s: name,
          page,
        },
        successCb: (data) => {
          const movies = checkInMyList(data.results);
          setListMovie({
            ...data,
            results: movies,
          });
          setListMovie(data);
          setOpen((prev) => ({
            ...prev,
            isOpen: false,
          }));
        },
        failedCb: (err) => {
          setListMovie({});
          setOpen((prev) => ({
            ...prev,
            isOpen: true,
            message: err.message,
          }));
        },
      });
    }
  };

  const getMovieById = (id, callback) => {
    if (id !== "" || id !== null) {
      useAxios({
        params: {
          i: id,
        },
        successCb: (data) => {
          data.isFavorited = false;
          let find = myList.find((element) => element.imdbID === id);
          if (typeof find !== "undefined") {
            data.isFavorited = true;
          }
          callback(data);
        },
        failedCb: (err) => {
          setListMovie({});
          setOpen((prev) => ({
            ...prev,
            isOpen: true,
            message: err.message,
          }));
        },
      });
    }
  };

  React.useEffect(() => {
    if (myList.length > 0) {
      if (typeof listMovie.results !== "undefined") {
        const movies = checkInMyList(listMovie.results);
        setListMovie({
          ...listMovie,
          results: movies,
        });
        updateLocalStorage(myList);
      }
    } else {
      if (typeof listMovie.results !== "undefined") {
        let movie = listMovie.results.map((item) => {
          item.isFavorited = false;
          return item;
        });

        setListMovie((prev) => ({
          ...prev,
          results: movie,
        }));
        updateLocalStorage(myList);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myList]);

  // Reatrive localStorage
  React.useEffect(() => {
    const myListLocal = localStorage.getItem("my_list");
    if (myListLocal !== null) {
      setMyList(JSON.parse(myListLocal));
    }
  }, []);

  // Function for adding to mylist
  const addToList = (data) => {
    setMyList([...myList, { ...data, isFavorited: true }]);
  };

  // Function for remove from my list
  const removeToList = (data) => {
    let id = data.imdbID;
    let dataArray = myList;
    let filteredArray = dataArray.filter((val) => val.imdbID !== id);
    setMyList(filteredArray);
  };
  const removeAllList = (data) => {
    setMyList([]);
  };

  return (
    <MovieContext.Provider
      value={{
        listMovie,
        myList,
        getMovieByName,
        addToList,
        removeToList,
        removeAllList,
        getMovieById,
      }}
    >
      {children}
      <Snackbar
        open={open.isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {open.message}
        </Alert>
      </Snackbar>
    </MovieContext.Provider>
  );
};

export default MovieProvider;

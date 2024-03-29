import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import SearchCard from "./SearchCard";
import { filter } from "./utils/Filter";
import { Context } from "./context/Context";
import AdvanceCard from "./card/AdvanceCard";
const Search = () => {
  const { load, searchdata, setQuery, query } = useContext(Context);
  // console.log(query);
  // console.log(searchdata && searchdata.data.results);

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("g");
  const [anime, setAnime] = useState([]);
  const [showfilter, setShowFilter] = useState(false);
  const [advancesearch, setAdvanceSearch] = useState(false);
  const [button, setButton] = useState("Filter");
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedstatus, setSelectedStatus] = useState(null);
  const [selectedtype, setSelectedType] = useState(null);
  const [selectedgenre, setSelectedGenre] = useState([]);
  // console.log(advancesearch);
  const [genre, setGenre] = useState([]);
  // console.log(genre);

  useEffect(() => {
    // console.log(searchdata);
    if (advancesearch) {
      setAnime(searchdata.results);
      // setShowFilter(true);
    }
  }, [searchdata]);
  useEffect(() => {
    const getData = setTimeout(() => {
      if (search.length < 2) {
        setLoading(false);
      } else {
        setLoading(true);
      }
      if (!advancesearch) {
        axios
          .get(`http://localhost:3000/api/search/${search}`)
          .then((response) => {
            console.log(response);
            setAnime(response.data);
            setLoading(false);
          });
      }
    }, 1000);

    return () => clearTimeout(getData);
  }, [search]);

  const HandleFilter = () => {
    setShowFilter(!showfilter);
    // setAdvanceSearch(!advancesearch);
    if (!showfilter) {
      setButton("Filter");
      setAdvanceSearch(false);
    }
  };
  const Season = (e) => {
    if (search.length > 1) {
      setQuery((prevQuery) => {
        if (prevQuery.includes("&season=")) {
          return prevQuery.replace(/&season=[A-Z]+/, `&season=${e}`);
        } else {
          return `${prevQuery}&season=${e}`;
        }
      });
    }
    setAdvanceSearch(true);
    setSelectedSeason(e);
    setQuery((prevQuery) => {
      if (prevQuery.includes("&season=")) {
        return prevQuery.replace(/&season=[A-Z]+/, `&season=${e}`);
      } else {
        return `${prevQuery}&season=${e}`;
      }
    });
    if (e === selectedSeason) {
      setSelectedSeason(0);
      console.log(query);
      setQuery((prevQuery) => prevQuery.replace(/&season=[A-Z]+/, ""));
    }
  };

  const Status = (e) => {
    setAdvanceSearch(true);
    setSelectedStatus(e);
    setQuery((prevQuery) => {
      if (prevQuery.includes("&status=")) {
        return prevQuery.replace(/&status=[A-Z]+/, `&status=${e}`);
      } else {
        return `${prevQuery}&status=${e}`;
      }
    });
    if (e === selectedstatus) {
      setSelectedStatus(0);
      console.log(query);
      setQuery((prevQuery) => prevQuery.replace(/&status=[A-Z_]+/, ""));
    }
  };

  const Types = (e) => {
    setAdvanceSearch(true);
    setSelectedType(e);
    setQuery((prevQuery) => {
      if (prevQuery.includes("&format=")) {
        return prevQuery.replace(/&format=[A-Z]+/, `&format=${e}`);
      } else {
        return `${prevQuery}&format=${e}`;
      }
    });
    if (e === selectedtype) {
      setSelectedType(0);
      console.log(query);
      setQuery((prevQuery) => prevQuery.replace(/&format=[A-Z_]+/, ""));
    }
  };
  const Genre = (e) => {
    setAdvanceSearch(true);
    setGenre((prev) => {
      if (prev.includes(e)) {
        setSelectedGenre(0);
        return prev.filter((arr) => arr !== e);
      } else {
        return [...prev, e];
      }
    });
    let genresQuery = JSON.stringify(genre);
    console.log(genresQuery);
  };
  useEffect(() => {
    setQuery((prevQuery) => {
      let updatedQuery = prevQuery.replace(/&genres=\[[^\]]*\]/, "");

      if (genre.length > 0) {
        updatedQuery += `&genres=${JSON.stringify(genre)}`;
      }

      return updatedQuery;
    });
  }, [genre]);

  return (
    <div className={`absolute top-0 left-0 w-full bg-black z-50 h-screen`}>
      <div className="p-5">
        <div className="w-full h-[10vh] flex flex-col bg-blue-950 relative rounded-lg">
          <input
            className="p-5 text-white w-[80%] h-full bg-transparent outline-0"
            type="search"
            placeholder="Search here..."
            onChange={(e) => {
              setSearch(e.target.value);
              if (search.length < 0) {
                setAdvanceSearch(true);
              }
              setAdvanceSearch(false);
            }}
          />
          <button
            onClick={HandleFilter}
            className="md:px-10 md:py-3 px-8 py-3 bg-gray-950 rounded-md absolute lg:top-3 lg:right-10 md:top-[15%] md:right-2 top-2 right-2 cursor-pointer"
          >
            {button}
          </button>
        </div>
      </div>
      {showfilter ? (
        <div className="flex flex-col gap-6  lg:px-12 lg:py-2 items-start p-2">
          <h1 className="text-xl md:text-2xl text-red-500">Filter search</h1>
          <div className="flex gap-5">
            <div className="flex lg:flex-row flex-col gap-5">
              <div className="flex gap-2">
                <h1 className="text-yellow-500">Season : </h1>
                {filter.season.map((dat, i) => {
                  return (
                    <p
                      key={i}
                      onClick={() => Season(dat.seas)}
                      className={`border-2 lg:px-3 lg:py-1 md:px-2 px-2 text-[12px] md:text-[15px] cursor-pointer rounded-lg ${
                        selectedSeason === dat.seas ? "bg-red-500 border-0" : ""
                      }`}
                    >
                      {dat.name}
                    </p>
                  );
                })}
              </div>
              <div className="flex items-center wrap gap-5">
                <h1 className="text-yellow-500">Status:</h1>
                <div className="flex wrap items-center gap-2">
                  {filter.status.map((dat, i) => {
                    return (
                      <p
                        key={i}
                        onClick={() => Status(dat.stat)}
                        className={`border-2 lg:px-3 text-[12px] md:text-[15px] md:px-2 px-1 py-1 cursor-pointer rounded-lg ${
                          selectedstatus === dat.stat
                            ? "bg-red-500 border-0"
                            : ""
                        }`}
                      >
                        {dat.name}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex gap-5">
              <h1 className="text-yellow-500">Type:</h1>
              <div className="flex gap-2">
                {filter.type.map((dat, i) => {
                  return (
                    <p
                      key={i}
                      onClick={() => Types(dat.types)}
                      className={`border-2 lg:px-3 px-1 text-[12px] md:text-[15px] cursor-pointer rounded-lg ${
                        selectedtype === dat.types ? "bg-red-500 border-0" : ""
                      }`}
                    >
                      {dat.name}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex gap-5">
            <h1 className="text-yellow-500">Genre: </h1>
            <div className="flex flex-wrap gap-2">
              {filter.genre.map((dat, i) => {
                return (
                  <p
                    key={i}
                    onClick={() => {
                      Genre(dat.name);
                    }}
                    className={`border-2 px-3 text-[12px] md:text-[15px] cursor-pointer rounded-lg ${
                      genre?.includes(dat.name) ? "bg-red-500 border-0" : ""
                    }`}
                  >
                    {dat.name}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
      {advancesearch ? (
        <AdvanceCard data={anime && anime} load={load} />
      ) : (
        <SearchCard data={anime && anime} load={loading} />
      )}
    </div>
  );
};

export default Search;

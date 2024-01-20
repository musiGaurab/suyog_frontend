import axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "./Skeleton";
import { BsFillPlayCircleFill, BsPlusCircleFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import Nav from "./Nav";
const Vertigo = () => {
  const [loading, setLoading] = useState(false);
  const [anime, setAnime] = useState([]);
  useEffect(() => {
    const CallApi = async () => {
      setLoading(true);
      try {
        const resq = await axios.get("http://localhost:3000/api/vertigo");
        // console.log(resq);
        setAnime(resq.data);
        // console.log(resq);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    CallApi();
  }, []);
  const navigate = useNavigate();

  const AnimeDetails = (id, description, coverPage, downloadLinks) => {
    const allDetails = {
      title: id,
      desc: description,
      image: coverPage,
      download: downloadLinks,
    };
    console.log(allDetails);
    navigate(`/details/${id}`, {
      state: {
        details: allDetails,
      },
    });
  };

  return (
    <>
      <Nav />
      <div className="mt-36 flex flex-col gap-5 md:p-5 p-2 bg-gray-800">
        <div className="flex items-center justify-between">
          <h1 className="md:text-2xl underline underline-offset-8 ml-10 text-[15px]">
            DC VERTIGO
          </h1>
        </div>
        <div className={`flex flex-wrap md:justify-center md:gap-2 gap-2`}>
          {loading ? (
            <Skeleton />
          ) : anime ? (
            anime.map((dat, i) => {
              const { coverPage, title, description, downloadLinks } = dat;
              return (
                <>
                  <div
                    key={i}
                    className="mt-10 lg:w-[18%] w-[48%] md:w-[30%] md:h-[450px] h-[300px] flex flex-col gap-1 md:p-2 overflow-hidden"
                  >
                    <div
                      className="w-full h-[60%] relative cursor-pointer img overflow-hidden"
                      onClick={() =>
                        AnimeDetails(
                          title,
                          description,
                          coverPage,
                          downloadLinks
                        )
                      }
                    >
                      <img
                        className="object-cover object-center w-full h-full rounded-md image"
                        src={coverPage}
                        alt="image"
                      />
                      <BsFillPlayCircleFill className="text-4xl absolute top-[50%] left-[40%] show z-20" />
                      <div className="flex gap-2 items-center absolute bottom-0 left-1 z-20">
                        {/* <p className="md:px-3 p-2 py-1 rounded-lg md:text-[10px] text-[9px] bg-red-700">
                          {status}
                        </p> */}
                        {/* <p className="px-2 py-1 border rounded-lg md:text-[10px] text-[9px]">
                          {anime.format}
                        </p> */}
                        {/* <p className="hidden md:flex px-2 py-1 border rounded-lg md:text-[10px] text-[9px]">
                          {duration}m
                        </p> */}
                      </div>
                      <div
                        className="w-screen h-[250px] absolute bottom-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(4, 21, 45, 0) 0%, #04152d 100%)",
                          zIndex: "0",
                        }}
                      ></div>
                    </div>
                    <div className="w-full flex flex-col gap-2  md:h-[30%] p-2 bg-blue-800 radius">
                      <div>
                        <h1 className="truncate font-bold lg:text-[15px] text-[14px]">
                          {title}
                        </h1>
                      </div>
                      <div className="flex items-end">
                        <p className="p-1 text-gray-300 text-[12px]">
                          {description
                            ? description.slice(0, 45)
                            : `${title}Lorem ipsum dolor sit amet`}
                          ...
                        </p>
                        {/* <p className="px-2 py-1 border rounded-md md:text-[11px] text-[5px]">
                          {releaseDate}
                        </p>
                        <p className="px-2 py-1 border rounded-md md:text-[11px] text-[8px]">
                          {type}
                        </p>
                        <p className="px-3 py-1 border rounded-md md:text-[11px] text-[8px]">
                          Ep{totalEpisodes}
                        </p> */}
                      </div>
                      <div className="flex gap-1 text-[13px] truncate">
                        <p>{/* <NavLink to="">Download</NavLink> */}</p>

                        {/* {genres.slice(0, 2).map((dat) => (
                          <p className="text-yellow-500 text-[12px] md:text-[15px]">
                            {dat},{" "}
                          </p>
                        ))} */}
                        <NavLink to={downloadLinks.DOWNLOADNOW} target="_blank">
                          <p className="cursor-pointer text-[12px] md:text-[15px] text-white p-2 rounded-md bg-red-500">
                            Download
                          </p>
                        </NavLink>
                      </div>
                      {/* <BsPlusCircleFill
                        title="Add to list"
                        className="cursor-pointer lg:text-3xl text-red-400 text-xl"
                      /> */}
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <Skeleton />
          )}
        </div>
      </div>
    </>
  );
};

export default Vertigo;

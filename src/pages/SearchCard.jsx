import React from "react";
import Skeleton from "./Skeleton";
import notfound from "../assets/not.png";
import { BsFillPlayCircleFill, BsPlusCircleFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
const SearchCard = ({ data, load }) => {
  const navigate = useNavigate();
  // console.log(data);
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
      <div className={`flex flex-wrap md:justify-center gap-2`}>
        {load ? (
          <Skeleton />
        ) : data ? (
          data.map((dat, i) => {
            const { coverPage, title, description, downloadLinks } = dat;
            return (
              <>
                <div
                  key={i}
                  className="lg:w-[18%] w-[48%] md:w-[30%] md:h-[450px] sm:h-[300px] flex flex-col gap-1 p-2 overflow-hidden"
                >
                  <div
                    className="w-full h-[60%] relative cursor-pointer img overflow-hidden"
                    onClick={() =>
                      AnimeDetails(title, description, coverPage, downloadLinks)
                    }
                  >
                    <img
                      className="object-cover object-center w-full h-full rounded-md image"
                      src={coverPage}
                      alt={title}
                    />
                    <BsFillPlayCircleFill className="text-4xl absolute top-[50%] left-[40%] show z-20" />
                    <div className="flex gap-2 items-center absolute bottom-0 left-1 z-20">
                      {/* <p className="md:px-3 p-2 py-1 rounded-lg md:text-[10px] text-[7px] bg-red-700">
                        {type}
                      </p>
                      {/* <p className="px-2 py-1 border rounded-lg md:text-[10px] text-[7px]">
                        {format}
                      </p> */}
                      {/* <p className="hidden md:flex px-2 py-1 border rounded-lg md:text-[10px] text-[7px]">
                        {duration}m
                      </p>{" "} */}
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
                  <div className="w-full flex flex-col gap-2 h-[30%] p-2 bg-blue-800 radius">
                    <div>
                      <h1 className="truncate font-bold lg:text-[15px] text-[12px]">
                        {title}
                      </h1>
                    </div>
                    <div className="flex items-end gap-2">
                      <p className="p-1 text-gray-300 text-[12px]">
                        {description
                          ? description.slice(0, 45)
                          : `${title}Lorem ipsum dolor sit amet`}
                        ...
                      </p>
                      {/* <p className="px-2 py-1 border rounded-md md:text-[11px] text-[5px]">
                        {status}
                      </p>
                      <p className="px-2 py-1 border rounded-md md:text-[11px] text-[5px]">
                        {releaseDate}
                      </p>

                      <p className="hidden md:flex px-3 py-1 border rounded-md md:text-[11px] text-[5px]">
                        Ep{totalEpisodes}
                      </p> */}
                    </div>
                    <div className="flex items-center  gap-1 text-[13px] truncate relative">
                      <NavLink to={downloadLinks.DOWNLOADNOW} target="_blank">
                        <p className="cursor-pointer text-[12px] md:text-[15px] text-white p-2 rounded-md bg-red-500">
                          Download
                        </p>
                      </NavLink>
                      {/* <p className="text-yellow-500 text-[10px] md:text-[15px]">
                        {genres[0]}, {genres[1]}
                      </p> */}
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
    </>
  );
};

export default SearchCard;

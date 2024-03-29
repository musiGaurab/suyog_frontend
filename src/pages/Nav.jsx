import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logos.png";
import { BiSearch, BiMenu } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "./Modal";
import axios from "axios";

const Nav = () => {
  const [showmenu, setshowMenu] = useState(false);
  const [showmodel, setShowModel] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const HandleMenu = () => {
    setshowMenu(!showmenu);
  };
  const navigate = useNavigate();
  const SearchAnime = () => {
    navigate("/search");
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setBackgroundColor("red");
      } else {
        setBackgroundColor("transparent");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const ModalHandler = () => {
    setShowModel(!showmodel);
  };
  // axios.defaults.withCredentials = true;

  // useEffect(() => {
  //   const CheckUser = async () => {
  //     const resq = await axios.get(
  //       "http://127.0.0.1:4000/api/v1/user/details",

  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     console.log(resq);
  //   };
  //   CheckUser();
  // }, []);
  return (
    <>
      <div
        className={`w-full flex items-center justify-between p-4 z-50 fixed top-0 ${
          backgroundColor === "transparent" ? "" : "nav"
        }`}
      >
        <div className="flex items-center gap-20 md:gap-10 overflow-hidden">
          <NavLink className="relative z-20" to="/">
            {/* <img className="w-[0px]" src={logo} alt="logo" /> */}
            <h1 className="text-[20px] sm:text-3xl text-4xl flex gap-0 items-center text-red-500 tracking-widest z-20 font-bold capitalize cur">
              NEPCoMiC
              <span className="text-red-500"></span>
            </h1>
          </NavLink>
          <div
            className={
              showmenu
                ? "flex absolute flex-col top-0 left-0 h-screen w-screen bg-red-950 lg:z-10 z-20 items-center gap-8 text-[17px] p-5 transition-all duration-1500"
                : "hidden lg:w-auto lg:flex lg:flex-row lg:text-[16px] z-10 lg:items-center md:gap-5 p-2"
            }
          >
            {showmenu ? (
              <div className=" w-screen flex justify-between p-3">
                <h1 className="text-[20px] sm:text-2xl flex gap-0 items-center text-red-500 tracking-wider">
                  NepAnimix
                  <span className="text-red-500"></span>
                </h1>
                <AiOutlineClose
                  onClick={HandleMenu}
                  className="cursor-pointer"
                  size={30}
                />
              </div>
            ) : null}
            {showmenu ? (
              <NavLink
                to="/search"
                className="flex items-center gap-3 border p-1 rounded-md"
              >
                Search <BiSearch size={20} />
              </NavLink>
            ) : null}
            <NavLink className="p-2" to="/marvel">
              Marvel comic
            </NavLink>
            <NavLink className="p-2" to="/vertigo">
              Vertigo
            </NavLink>
            <NavLink className="p-2" to="/wildstorm">
              Wildstorm
            </NavLink>
            <NavLink className="p-2" to="/scedule">
              Schedule
            </NavLink>
          </div>
        </div>

        <div className="hidden lg:flex lg:z-50 items-center gap-5 p-2">
          <div className="flex items-center relative">
            <input
              className="bg-slate-700 p-2 hidden rounded-md"
              type="text"
              placeholder="Search anime"
            />
            <BiSearch
              onClick={SearchAnime}
              className="cursor-pointer"
              size={25}
            />
          </div>
          <VscAccount
            onClick={ModalHandler}
            className="cursor-pointer"
            size={25}
          />
        </div>
        <BiMenu
          className="flex cursor-pointer lg:hidden z-10"
          onClick={HandleMenu}
          size={30}
        />
      </div>
      <Modal show={showmodel} />
    </>
  );
};

export default Nav;

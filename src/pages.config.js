import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Discover from "./pages/Discover";
import Projects from "./pages/Projects";
import Mentors from "./pages/Mentors";
import Profile from "./pages/Profile";
import __Layout from "./Layout.jsx";

export const PAGES = {
  Home,
  Rooms,
  Discover,
  Projects,
  Mentors,
  Profile,
};

export const pagesConfig = {
  mainPage: "Home",
  Pages: PAGES,
  Layout: __Layout,
};

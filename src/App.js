import React, { useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Footer, ThemeSettings } from "./components";
import {
  Login,
  Ecommerce,
  News,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Notification,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorPicker,
  ColorMapping,
  Editor,
  NavbarMain,
} from "./pages";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, themeSettings } =
    useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  const userID = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : null;

  return (
    /*
   
    */
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <NavbarMain>
            <div>
              {themeSettings && <ThemeSettings />}
              {userID === null ? (
                <Login></Login>
              ) : (
                <Routes>
                  {/* dashboard  */}
                  <Route path="/" element={<Customers />} />
                  <Route path="/Home" element={<Ecommerce />} />

                  {/* pages  */}
                  {/* <Route path="/orders" element={<Orders />} /> */}
                  <Route path="/Students" element={<Employees />} />
                  <Route path="/Teachers" element={<Customers />} />

                  {/* apps  */}
                  <Route path="/News" element={<News />} />
                  <Route path="/Notification" element={<Notification />} />
                  {/* <Route path="/editor" element={<Editor />} />
                  <Route path="/color-picker" element={<ColorPicker />} /> */}

                </Routes>
              )}
            </div>
            <Footer />
          </NavbarMain>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;

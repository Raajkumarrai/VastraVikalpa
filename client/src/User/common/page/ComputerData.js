import React, { useEffect, useState } from "react";
import Computer from "../../Pages/Home/HeroSection/Computer";

const ComputerData = ({ setColorChange, colorChange }) => {
  const [computerRotation, setComputerRotation] = useState(true);
  // console.log(computerRotation);
  const [colorsData, setColorsData] = useState({
    primaryColor: 0,
    backgroundColor: 0,
    darkFontColor: 0,
    lightFontColor: 0,
    DarkFont: 0,
    PcHardware: 0,
    PcSoftware: 0,
    borderDark: 0,
  });
  const numberToHexColor = (n) => {
    if (n > 100) {
      return "#E6E6FA";
    } else if (n > 90) {
      return "#008080";
    } else if (n > 80) {
      return "#800000";
    } else if (n > 70) {
      return "#ee82ee";
    } else if (n > 60) {
      return "#4b0082";
    } else if (n > 50) {
      return "#00ffff";
    } else if (n > 40) {
      return "#ffff00";
    } else if (n > 30) {
      return "#ffa500";
    } else if (n > 20) {
      return "#0000ff";
    } else if (n > 10) {
      return "#008000";
    } else if (n > 2) {
      return false;
    } else {
      return false;
    }
  };
  useEffect(() => {
    const updateColors = (prevColors) => ({
      ...prevColors,
      primaryColor: numberToHexColor(colorsData.primaryColor) || "#ea580c",
      backgroudColor: numberToHexColor(colorsData.backgroundColor) || "#0f1019",
      textDarkColor: numberToHexColor(colorsData.darkFontColor) || "#ffffffe6",
      textLightColor:
        numberToHexColor(colorsData.lightFontColor) || "#ffffffb3",
      textFullDark: numberToHexColor(colorsData.DarkFont) || "#ffffff",
      pcBodyColor: numberToHexColor(colorsData.PcHardware) || "#0c0c0c",
      browserColor: numberToHexColor(colorsData.PcSoftware) || "#111",
      borderDarkColor: numberToHexColor(colorsData.borderDark) || "#ffffff40",
    });

    setColorChange((prevColors) => updateColors(prevColors));
    // eslint-disable-next-line
  }, [colorsData]);

  const [initialClick, setInitialClick] = useState(true);

  return (
    <div className="h-screen w-full border-t border-dashed border-[var(--border-light-color)] flex justify-center items-center ">
      <div className="h-full max-h-[620px] w-full max-w-[1100px] p-3 bg-[var(--pc-body-color)] rounded-sm">
        <Computer
          setComputerRotation={setComputerRotation}
          setColorChange={setColorChange}
          colorChange={colorChange}
          setColorsData={setColorsData}
          colorsData={colorsData} // eslint-disable-next-line
          computerRotation={computerRotation}
          initialClick={initialClick}
          setInitialClick={setInitialClick}
        />
      </div>
    </div>
  );
};

export default ComputerData;

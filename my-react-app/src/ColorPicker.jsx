import { useState } from "react";
import React from "react";
import "./ColorPicker.css";
import cssNamedColors from './colors';
import { HexColorPicker } from "react-colorful";

export default function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState({ hex: null, name: null });
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [color, setColor] = useState("#aabbcc");

  const colors = cssNamedColors;

  // Function to copy hex code to clipboard
  const copyToClipboard = (hexCode) => {
    navigator.clipboard.writeText(hexCode).then(
      () => {
        console.log("Hex code copied to clipboard: ", hexCode);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  // Event Handlers
  const copyHex = () => {
    navigator.clipboard.writeText(color).then(() => {
      console.log("Copied:", color);
    });
  };

  const handleClick = (color) => {
    setSelectedColor({ hex: color.hex, name: color.name });
    copyToClipboard(color.hex);
  };

  const handleMouseEnter = (hex) => {
    setSelectedColor({ hex: hex, name: null });
  };

  const handleMouseLeave = () => {
    setSelectedColor({ hex: null, name: null });
  };

  const handleFocus = (index) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowLeft") {
      let prevIndex;
      if (index === 0) {
        prevIndex = colors.length - 1;
      } else {
        prevIndex = index - 1;
      }
      document.querySelectorAll(".color-item")[prevIndex].focus();
    } else if (e.key === "ArrowRight") {
      let nextIndex;
      if (index === colors.length - 1) {
        nextIndex = 0;
      } else {
        nextIndex = index + 1;
      }
      document.querySelectorAll(".color-item")[nextIndex].focus();
      console.log(document.querySelectorAll(".color-item"));
    } else if (e.key === "Enter") {
      handleClick(colors[index]);
    }
  };

  return (
      <>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin:"30px 10px" }}>
          <HexColorPicker color={color} onChange={setColor} onClick={copyHex}/>
          {/*<button onClick={copyHex}>Copy Hex</button>*/}
        </div>
    <div className="color-picker">
      <h1>Color Picker</h1>
      <div className="color-list">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`color-item ${focusedIndex === index ? "focused" : ""}`}
            style={{ backgroundColor: color.hex }}
            onClick={() => handleClick(color)}
            onMouseEnter={() => handleMouseEnter(color.hex)}
            onMouseLeave={handleMouseLeave}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, index)}
            tabIndex={0}
          >
            {selectedColor.hex === color.hex && (
              <span className="color-code">
                {selectedColor.name || color.hex}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
        </>
  );
}

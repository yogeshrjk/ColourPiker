import { useState } from "react";
import React from "react";
import "./ColorPicker.css";

export default function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState({ hex: null, name: null });
  const [focusedIndex, setFocusedIndex] = useState(null);

  const colors = [
    { name: "Red", hex: "#FF0000" },
    { name: "Green", hex: "#00FF00" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Cyan", hex: "#00FFFF" },
    { name: "Magenta", hex: "#FF00FF" },
  ];

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
  );
}

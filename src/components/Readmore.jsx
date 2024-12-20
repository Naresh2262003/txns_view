import React, { useState } from "react";

const ReadMore = ({ text, maxLines = 3 }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const flattenArray = (arr) =>
    arr.reduce(
      (acc, val) => acc.concat(Array.isArray(val) ? flattenArray(val) : val),
      []
    );

  const displayText = Array.isArray(text)
    ? flattenArray(text).join(" ")
    : text;

  const style = {
    overflow: "hidden",
    display: expanded ? "block" : "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: expanded ? "none" : maxLines,
    wordBreak: "break-word",
  };

  return (
    <div>
      <div style={style}>{displayText}</div>
      {displayText.split("\n").join(" ").length > 100 && ( // Adjust the length check based on your needs
        <span
          onClick={toggleExpanded}
          style={{ color: "blue", cursor: "pointer", marginTop: "4px", display: "block" }}
        >
          {expanded ? "Show less" : "Read more"}
        </span>
      )}
    </div>
  );
};

export default ReadMore;

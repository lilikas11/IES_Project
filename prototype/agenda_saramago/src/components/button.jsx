import React from "react";
import { WiredCard } from "wired-elements";
import "../assets/css/styles.css";

function Button(props) {
  return (
    <button onClick={"props.onClick"} className="rounded-md bg-[#5BB6AE] px-3.5 py-2.5 text-bg font-semibold text-white shadow-sm hover:bg-[#037971] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#037971]" style={{marginLeft:"10px"}}>
      {props.label}
    </button>
  );
}

export default Button;
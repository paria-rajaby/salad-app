import React from "react";
import "./Header.css";
import { FaBasketShopping } from "react-icons/fa6";

export default function Header() {
  return (
    <div className="header">
      <div className="header-topbar">
        <span className="shop-name">FRESHBOWL</span>
        <button className="basket">
          <FaBasketShopping />
        </button>
      </div>
      <div className="header-desc">
        <h1 className="header-desc_text">
          “Dive into fresh, crunchy salads bursting with flavor, colors, and
          happiness – because healthy food should always be this fun!”
        </h1>
        <img
          className="header-desc_img"
          src="./images/saladbowl.png"
          alt="salad"
        />
      </div>
    </div>
  );
}

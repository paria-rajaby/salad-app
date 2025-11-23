import React from "react";
import "./Team.css";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Team() {
  return (
    <div className="teamsection-wrapper">
      <img src="./images/saladbowl.png" alt="salad" />
      <div className="team-desc_wrapper">
        <h2>
          Our team creats fresh, healthy salads with passion every single day
        </h2>
        <p>
          Our team brings together passion, creativity, and fresh ideas to craft
          delicious, healthy salads every day, ensuring a memorable experience
          with every bite.
        </p>
        <button>
          Check
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
}

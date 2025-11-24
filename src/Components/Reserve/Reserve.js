import React from "react";
import Swal from "sweetalert2";
import "./Reserve.css";

export default function Reserve() {
  const reserveTable = () => {
    Swal.fire({
      title: "Please fill your information",
      html: `<input id="swal1"  type="text" placeholder="you name..." />
        <input id="swal2" type="text" placeholder="you number..." />`,
      showCancelButton: true,
      showConfirmlButton: true,
      preConfirm: () => {
        const name = document.getElementById("swal1").value;
        const number = document.getElementById("swal2").value;
        if (!name || !number) {
          Swal.showValidationMessage("Please complete your information!");
        }
        return { name, number };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(`Dear ${result.value.name} your table reserved successfuly!`);
      }
    });
  };
  return (
    <div className="reserve-section">
      <div>
        <h2>Want to Reserve a table?</h2>
        <button onClick={reserveTable}>Reserve now</button>
      </div>
      <span></span>
    </div>
  );
}

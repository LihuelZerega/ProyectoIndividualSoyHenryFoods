import React from "react";
import "./Paginado.css";

function Paginado({ recipesPerPage, allRecipes, currentPage, paginado }) {
  const pageNumbers = [];

  for (let i = 0; i <= Math.floor(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <div className="paginado">
      <button
        className="prevNextButton"
        onClick={() => paginado(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"< Prev"}
      </button>
      {pageNumbers?.map((number) => (
        <button
          className={`numberpage ${currentPage === number ? "active" : ""}`}
          key={number}
          onClick={() => paginado(number)}
        >
          <b>{number}</b>
        </button>
      ))}
      <button
        className="prevNextButton"
        onClick={() => paginado(currentPage + 1)}
        disabled={currentPage === pageNumbers.length}
      >
        {"Next >"}
      </button>
    </div>
  );
}

export default Paginado;

import React from "react";

export const PaginateLinks = ({
  usersPerPage,
  totalUsers,
  paginate,
  deleteSelected,
}) => {
  const PagesArray = [];
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    PagesArray.push(i);
  }
  return (
    <div className="pages">
      <button onClick={() => deleteSelected()}>Delete Selected</button>
      <div>
        {PagesArray.map((page) => {
          return (
            <button type="button" key={page} onClick={() => paginate(page)}>
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
};

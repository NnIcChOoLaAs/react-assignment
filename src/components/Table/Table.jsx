import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPeople,
  toggleSortDirection,
  setPage,
} from "../../store/slices/peopleSlice";
import { fetchPlanet } from "../../store/slices/planetsSlice";
import SearchFilter from "../Filter/SearchFilter";
import { formatDate } from "../../utils/formatters";

const ITEMS_PER_PAGE = 20;

const Table = () => {
  const dispatch = useDispatch();
  const {
    displayData,
    filteredData,
    status,
    error,
    sortDirection,
    currentPage,
  } = useSelector((state) => state.people);

  useEffect(() => {
    dispatch(fetchAllPeople());
  }, []);

  const handlePlanetClick = (url) => {
    const planetId = url.split("/").filter(Boolean).pop();
    if (planetId) dispatch(fetchPlanet(planetId));
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div>
      <SearchFilter />
      <div className="p-2 bg-white rounded-md">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2 text-left">
                <button onClick={() => dispatch(toggleSortDirection())}>
                  Name {sortDirection === "asc" ? "↓" : "↑"}
                </button>
              </th>
              <th className="hidden md:table-cell p-2 text-left">Height</th>
              <th className="hidden md:table-cell p-2 text-left">Mass</th>
              <th className="hidden md:table-cell p-2 text-left">Created</th>
              <th className="hidden md:table-cell p-2 text-left">Edited</th>
              <th className="hidden md:table-cell p-2 text-left">Planet</th>
            </tr>
          </thead>
          <tbody className=" p-4 rounded-md">
            {displayData.map((person) => (
              <tr key={person.url} className="border-b">
                <td className="p-2">
                  <div className="flex justify-between">
                    <span>{person.name}</span>
                  </div>
                  {/* Mobile view details */}
                  <div className="md:hidden mt-2">
                    <p>Height: {person.height}</p>
                    <p>Mass: {person.mass}</p>
                    <p>Created: {formatDate(person.created)}</p>
                    <p>Edited: {formatDate(person.edited)}</p>
                    <button
                      onClick={() => handlePlanetClick(person.homeworld)}
                      className="text-blue-500"
                    >
                      View Planet
                    </button>
                  </div>
                </td>
                <td className="hidden md:table-cell p-2">{person.height}</td>
                <td className="hidden md:table-cell p-2">{person.mass}</td>
                <td className="hidden md:table-cell p-2">
                  {formatDate(person.created)}
                </td>
                <td className="hidden md:table-cell p-2">
                  {formatDate(person.edited)}
                </td>
                <td className="hidden md:table-cell p-2">
                  <button
                    onClick={() => handlePlanetClick(person.homeworld)}
                    className="text-blue-500"
                  >
                    View Planet
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center p-2 rounded-md bg-white">
        <button
          onClick={() => dispatch(setPage(currentPage - 1))}
          disabled={currentPage === 1}
          className="border p-2 rounded"
        >
          Prev
        </button>
        <span className="hidden md:block">
          {currentPage} of {Math.ceil(filteredData.length / ITEMS_PER_PAGE)}
        </span>
        <button
          onClick={() => dispatch(setPage(currentPage + 1))}
          disabled={
            currentPage === Math.ceil(filteredData.length / ITEMS_PER_PAGE)
          }
          className="border p-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;

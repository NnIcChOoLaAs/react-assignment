import { useDispatch, useSelector } from "react-redux";
import { setNameFilter } from "../../store/slices/peopleSlice";

const SearchFilter = () => {
  const dispatch = useDispatch();
  const nameFilter = useSelector((state) => state.people.nameFilter);

  return (
    <div className="mb-4">
      <input
        type="text"
        value={nameFilter}
        onChange={(e) => dispatch(setNameFilter(e.target.value))}
        placeholder="Filter by name..."
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default SearchFilter;

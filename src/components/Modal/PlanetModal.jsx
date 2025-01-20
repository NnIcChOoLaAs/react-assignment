import { useSelector, useDispatch } from "react-redux";
import { clearSelectedPlanet } from "../../store/slices/planetsSlice";

const PlanetModal = () => {
  const dispatch = useDispatch();
  const { selectedPlanet, status } = useSelector((state) => state.planets);

  if (!selectedPlanet && status !== "loading") return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded max-w-md w-full m-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">
            {status === "loading" ? "Loading..." : selectedPlanet?.name}
          </h2>
          <button onClick={() => dispatch(clearSelectedPlanet())}>×</button>
        </div>

        {status === "loading" ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          selectedPlanet && (
            <div className="mt-4 space-y-2">
              <p>Diameter: {selectedPlanet.diameter}</p>
              <p>Climate: {selectedPlanet.climate}</p>
              <p>Population: {selectedPlanet.population}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PlanetModal;

import Table from "./components/Table/Table";
import PlanetModal from "./components/Modal/PlanetModal";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Table />
        <PlanetModal />
      </main>
    </div>
  );
}

export default App;

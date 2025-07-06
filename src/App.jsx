import { Carousel } from "./components/layout/carousel";
import { Navbar } from "./components/layout/navbar";

function App() {
  return (
    <div className="bg-secondary h-screen w-full flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Carousel />
      </main>
    </div>
  );
}

export default App;

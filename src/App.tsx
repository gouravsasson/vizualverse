import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import Ourwork from "./component/Ourwork";

function App() {
  return (
    <>
      <div className=" overflow-hidden">
        <div className=" w-screen h-screen bg-black flex flex-col">
          <div className=" basis-[10%]">
            <Navbar />
          </div>
          <div className=" basis-[90%]">
            <Hero />
          </div>
        </div>
        <div className="w-screen bg-black flex flex-col">
          <Ourwork />
        </div>
      </div>
    </>
  );
}

export default App;

import Aside from "./components/Aside";
import Histogram from "./components/Histogram";
import BackIcon from "./components/icons/BackIcon";
import { useImage } from "./hooks/useImage";

function App() {
    const { url, setUrl } = useImage();
    return (
        <section
            className={`min-h-screen flex justify-center py-4 items-center  ${
                url !== "" && "justify-start"
            }`}
        >
            {url === "" && <Aside />}

            {url && (
                <div className="flex items-center flex-col p-4 bg-[#26282C] rounded-xl gap-4 border-[#424549] border shadow-xl xl:flex-row relative">
                    <Histogram/>

                    <button className=" -top-12 right-0 bg-[#05A7A8] text-sm px-3 py-2 rounded-xl xl:absolute flex items-center gap-3 hover:shadow-2xl hover:shadow-[#05a8a891] transition-all duration-300"
                    onClick={() => setUrl("")}
                    > 
                
                    <BackIcon />
                    
                    Ingresar otra imagen</button>
                </div>
            )}
        </section>
    );
}

// Node js
export default App;

// React Js

/*

  <section className="w-screen h-screen flex flex-col lg:flex-row">
            <Aside />

            <section className="w-full py-4 overflow-y-auto flex">
                {url && (
                    <div className="flex flex-col gap-3 ">
                        <Histogram color="gray" />
                    </div>
                )}
            </section>
            
            
        </section>

*/

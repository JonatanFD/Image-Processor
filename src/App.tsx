import Aside from "./components/Aside";
import Histogram from "./components/Histogram";
import BackIcon from "./components/icons/BackIcon";
import GithubIcon from "./components/icons/GithubIcon";
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
                    <Histogram />

                    <div className="-top-12 right-0  xl:absolute flex items-center gap-3">

                        <GithubIcon />

                        <button onClick={() => setUrl("")} className="bg-[#05A7A8] flex items-center gap-3 hover:shadow-2xl  text-sm px-3 py-2 rounded-xl hover:shadow-[#05a8a891] transition-all duration-300">
                            <BackIcon />
                            Ingresar otra imagen
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default App;

import { useImage } from "../hooks/useImage";
import Chart from "./Chart";
import useHistogram from "../hooks/useHistogram";

export default function BarChart() {
    const minName = "min-gray";
    const maxName = "max-gray";

    const imageState = useImage();

    const {
        equalizeHistogram,
        onSubmit,
        register,
        histogram,
        restart,
        histogramInterval,
    } = useHistogram(imageState);

    return (
        <div className=" flex gap-3 flex-col xl:flex-row h-full">
            <Chart histogram={histogram} />

            <div>
                <form onSubmit={onSubmit} className="flex flex-col">
                    <h2 className="mb-4">Intervalo de color</h2>
                    <label htmlFor={minName} className="text-sm ">
                        Nuevo Limite Inferior
                    </label>
                    <input
                        type="number"
                        min={0}
                        max={256}
                        id={minName}
                        {...register("min", {required: true})}
                        className=" px-3 py-2 rounded-xl mt-2 hover:bg-[#424549]"
                    />

                    <label htmlFor={maxName} className="text-sm mt-4">
                        Nuevo Limite Superior
                    </label>
                    <input
                        type="number"
                        min={0}
                        max={256}
                        id={maxName}
                        {...register("max", {required: true})}
                        className=" px-3 py-2 rounded-xl mt-2 hover:bg-[#424549]"
                    />

                    <button className="mt-4 bg-blue-600 rounded-lg py-2 hover:bg-blue-500">
                        Expandir
                    </button>
                </form>

                <div className="flex flex-col mt-4">
                    <h3>Información</h3>
                    <span>
                        Intervalo de la Imagen [ {histogramInterval.min} -{" "}
                        {histogramInterval.max} ]
                    </span>
                    <button
                        className="mt-4 bg-blue-600 rounded-lg py-2 px-3 hover:bg-blue-500"
                        onClick={equalizeHistogram}
                    >
                        Ecualizar
                    </button>
                    <button
                        className="bg-green-600 rounded-lg py-2 px-3 hover:bg-green-500 mt-4 text-black"
                        onClick={restart}
                    >
                        Reiniciar Imagen
                    </button>
                </div>
            </div>
        </div>
    );
}

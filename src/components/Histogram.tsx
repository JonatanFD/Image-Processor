import { useImage } from "../hooks/useImage";
import BarChart from "./BarChart";

export default function Histogram() {
    const { colors } = useImage();

    return (
        <>
            <div className="flex  flex-col gap-4">
                <h2>Imagen Original</h2>
                <img
                    src={colors.grayOriginal}
                    alt={`gray image`}
                    className="w-52 rounded-lg mx-auto"
                />
            </div>

            <div className="flex flex-col w-fit">
                <BarChart />
            </div>

            <div className="flex flex-col gap-4">
                <h2>Resultado</h2>
                <img
                    src={colors.gray}
                    alt={`gray image`}
                    className="w-52 rounded-lg mx-auto"
                />
            </div>

       
        </>
    );
}

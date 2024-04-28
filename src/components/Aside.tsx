import { useRef } from "react";
import { useImage } from "../hooks/useImage";
import ImageIcon from "./icons/ImageIcon";

export default function Aside() {
    const fileRef = useRef<HTMLInputElement>(null);
    const { setUrl } = useImage((state) => state);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }
        setUrl(URL.createObjectURL(file));
    };

    return (
        <section className="w-full lg:w-64 p-4 h-fit bg-[#26282C] rounded-xl border-[#424549] border shadow-xl">

            <div className="w-full py-10 flex justify-center items-center">
                <ImageIcon />
            </div>
            
            <div>
                <input
                    type="file"
                    hidden
                    ref={fileRef}
                    onChange={handleFileChange}
                />
                <button
                    onClick={() => fileRef.current?.click()}
                    className="bg-[#05A7A8] w-full rounded-lg py-2 font-semibold text-lg hover:shadow-2xl hover:shadow-[#05a8a891] transition-all duration-300"
                >
                    Abrir una imagen
                </button>
            </div>
        </section>
    );
}

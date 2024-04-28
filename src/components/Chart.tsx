
export default function Chart({
    histogram,
}: {
    histogram: number[];
}) {
    const maxValue = Math.max(...histogram);
    
    return (
        <div className="flex flex-col">
            <h2 className="mb-4">Histograma</h2>
            <section className="flex items-end h-[300px] xl:h-full bg-black">
                {histogram.map((value, index) => (
                    <div
                        className="w-[1px] lg:w-[2px]"
                        style={{
                            backgroundColor: "gray",
                            height: `${(value / maxValue) * 95}%`,
                        }}
                        key={"gray-" + index}
                    ></div>
                ))}
            </section>
        </div>
    );
}

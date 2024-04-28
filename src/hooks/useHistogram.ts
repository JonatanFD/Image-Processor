import { useEffect, useState } from "react";
import { ImageStore } from "./useImage";
import { useForm } from "react-hook-form";

const linealFunction = (m: number, b: number, x: number) => m * x + b;

function* getSumOfElements(ratios: number[]) {
    let sum = 0;
    for (let i = 0; i < ratios.length; i++) {
        sum += ratios[i];
        yield Math.abs(sum);
    }
}

export default function useHistogram({colors, setColorUrl, url, setGrayImage }: ImageStore) {

  const [histogramInterval, setHistogramInterval] = useState({
      min: Infinity,
      max: -Infinity,
  });

  const [histogram, setHistogram] = useState<number[]>([]);
  const [firstHistogram, setFirstHistogram] = useState<number[]>([]);

  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit((data) => {
      expandHistogram({ min: parseInt(data.min), max: parseInt(data.max) });
  });

  // expande la imagen de acuerdo al intervalo que se ingresa
  const expandHistogram = (interval: { min: number; max: number }) => {
      // se obtiene la función lineal
      const m =
          (interval.max - interval.min) /
          (histogramInterval.max - histogramInterval.min);
      const b = interval.min - m * histogramInterval.min;

      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;

          ctx?.drawImage(img, 0, 0);

          // se obtiene la data de toda la imagen
          const imageData = ctx?.getImageData(0, 0, img.width, img.height);
          const data = imageData?.data;
          if (!data) return;

          // se transforma por la ecuación lineal
          for (let i = 0; i < data?.length; i += 4) {
              const red = data[i];
                  const luminance = Math.round(linealFunction(m, b, red));
                  data[i] = data[i + 1] = data[i + 2] = luminance;
          }

          // se cuenta la cantidad de cada pixel
          const dataHistogram = Array<number>(256).fill(0);
          for (let i = 0; i < data?.length; i += 4) {
              const r = data[i];

                  dataHistogram[r]++;
          }

          ctx?.putImageData(imageData, 0, 0);
          const coloredUrl = canvas.toDataURL();

          setGrayImage(coloredUrl);
          setHistogram(dataHistogram);
      };

      // se carga la imagen de lo que se quiere expandir
      img.src = colors.gray as string;
  };

  const equalizeHistogram = () => {
      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
          const totalPixel = img.width * img.height;

          // se obtiene el porcentaje de cada color con respecto al total
          const ratioHistogram: number[] = [];
          for (let i = 0; i < histogram.length; i++) {
              const ratio = histogram[i] / totalPixel;
              ratioHistogram.push(ratio);
          }

          const sumGenerator = getSumOfElements(ratioHistogram);

          const newColorIntensity = Array(256).fill(0);

          for (let i = 0; i < newColorIntensity.length; i++) {
              const newIntensity =
                  (sumGenerator.next().value as number) * 255; // nueva intensidad de color
              newColorIntensity[i] = Math.round(newIntensity);
          }
          // hasta aca tengo un array con las nuevas intensidades de cada pixel
          console.log("newColorIntensity", newColorIntensity);

          // se calcula el nuevo histograma
          const newHistogram = Array(256).fill(0);
          for (let i = 0; i < newColorIntensity.length; i++) {
              newHistogram[newColorIntensity[i]] += histogram[i];
          }

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;

          ctx?.drawImage(img, 0, 0);
          const imageData = ctx?.getImageData(0, 0, img.width, img.height);
          const data = imageData?.data;
          if (!data) return;

          // se reemplaza por la nueva intensidad
          for (let i = 0; i < data?.length; i += 4) {
              const red = data[i];

              data[i] =
                  data[i + 1] =
                  data[i + 2] =
                      newColorIntensity[red];
          }
          ctx?.putImageData(imageData, 0, 0);
          const coloredUrl = canvas.toDataURL();

          setGrayImage(coloredUrl);
          setHistogram(newHistogram);
      };

      img.src = colors.gray as string;
  };

  const restart = () => {
      setGrayImage(colors.grayOriginal);
      setHistogram(firstHistogram);
  };

  // Crea la imagen de acuerdo al color que se pasa por argumento del componente
  useEffect(() => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);

          const imageData = ctx?.getImageData(0, 0, img.width, img.height);
          const data = imageData?.data;
          if (!data) return;
          const dataHistogram = Array(256).fill(0);
          for (let i = 0; i < data?.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];

              const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
              dataHistogram[Math.round(luminance)]++;
              data[i] = data[i + 1] = data[i + 2] = luminance;
          }
          ctx?.putImageData(imageData, 0, 0);
          const coloredUrl = canvas.toDataURL();

          setColorUrl(coloredUrl);
          setHistogram(dataHistogram);
          setFirstHistogram(dataHistogram);
      };
      img.src = url;
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
      const interval = {
          min: Infinity,
          max: -Infinity,
      };

      for (let i = 0; i < histogram.length; i++) {
          const value = histogram[i];

          if (value === 0) continue;

          if (interval.min === Infinity) {
              interval.min = i;
          }
          interval.max = i;
      }

      setHistogramInterval({
          max: interval.max,
          min: interval.min,
      });
  }, [histogram]);


  return {
    register,
    onSubmit,
    equalizeHistogram,
    restart,
    histogram,
    histogramInterval,
    expandHistogram
  }

}

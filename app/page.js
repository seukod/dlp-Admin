"use client";
import pruebas from "@/app/data/pruebas.json";
import Ramo from "@/app/components/ramo";
import { useState } from "react";
import { Button } from "@chakra-ui/react";

const compararFechas = (a, b) => {
  const fechaA = new Date(a.testDate);
  const fechaB = new Date(b.testDate);
  return fechaA - fechaB; // Ordenar de la fecha más cercana a la más lejana
};
export default function Home() {
  const [contador, setContador] = useState(0);
  const handleOnclick = (e) => {
    setContador(contador + 1);
  };
  const pruebasOrdenadas = [...pruebas.tests].sort(compararFechas);
  return (
    <>
      <div className="cabecera">
        <h1>Asignaturas</h1>
        <Button onClick={handleOnclick}>Apriétame</Button>
        <h2>{contador}</h2>
      </div>
      <div className="contenedor">
        {pruebasOrdenadas.map((ramo, i) => (
          <Ramo key={ramo.subjectId || i} datosRamo={ramo} indice={i}></Ramo>
        ))}
      </div>
    </>
  );
}
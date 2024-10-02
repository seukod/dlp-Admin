"use client";
import pruebas from "@/app/data/pruebas.json";
import Ramo from "@/app/components/ramo";
import { useState } from "react";
import { Button } from "@chakra-ui/react";


export default function Home() {

  return (
    <>
      <div className="cabecera">
        <h1>Asignaturas</h1>
        <h2>{contador}</h2>
      </div>
      <div className="contenedor"></div>
    </>
  );
}
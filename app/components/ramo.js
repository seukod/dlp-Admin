import { useState, useEffect } from "react";

const Calctiemporest = (fecha) => {
    const fechactual = new Date();
    const fechaprueba = new Date(fecha);
    const diff = fechaprueba - fechactual;
    const diasRestantes = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horasRestantes = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutosRestantes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const segundosRestantes = Math.floor((diff % (1000 * 60)) / (1000)).toString().padStart(2, '0');
    return {
        tiempoRestante: `${diasRestantes} días, ${horasRestantes}:${minutosRestantes}:${segundosRestantes}`,
        esCritico: diasRestantes < 7,
        eliminar: diasRestantes < 0 && horasRestantes < '00' && minutosRestantes < '00' && segundosRestantes < '00'
    };
}

const Ramo = ({ datosRamo, indice }) => {
    const [tiempoRestanteObj, setTiempoRestante] = useState(Calctiemporest(datosRamo.testDate));
    useEffect(() => {
        const intervalID = setInterval(() => {
            setTiempoRestante(Calctiemporest(datosRamo.testDate));
        }, 1000);

        return () => clearInterval(intervalID);
    }, [datosRamo.testDate]);


    if (tiempoRestanteObj.eliminar) {
        return null;
    }

    const [contador, setContador] = useState(0);
    const [estaContando, setEstaContando] = useState(false);

    const handleOnClick = (e) => {
        setEstaContando(!estaContando);
    };

    useEffect(() => {
        let intervalID;
        if (estaContando) {
            intervalID = setInterval(() => setContador(contador + 1), 1000);
        }
        return () => clearInterval(intervalID);
    }, [estaContando, contador]);

    return (
        <div className={indice % 2 === 0 ? "ramo" : "ramo impar"}>
            <div className="parte1">
                <div className="codCurso">{datosRamo.subjectId}</div>
                <div className="tituloCurso">{datosRamo.subjectName}</div>
            </div>
            <div className="parte2">
                <div className={`fecPrueba ${tiempoRestanteObj.esCritico ? "critico" : ""}`}>
                    {tiempoRestanteObj.tiempoRestante}
                </div>
            </div>
        </div>
    );
};

export default Ramo;

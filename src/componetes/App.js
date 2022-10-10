import { BrowserRouter, Routes, Route } from "react-router-dom";
import TelaFilmes from "./TelaFilmes/TelaFilmes";
import TelaSessoes from "./TelaSessoes/TelaSessoes";
import TelaAssentos from "./TelaAssentos/TelaAssentos";
import TelaSucesso from "./TelaSucesso/TelaSucesso";
import Header from "./Header/Header";
import { useState } from "react";
export default function App() {
  const [reserva, setReserva] = useState(null);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<TelaFilmes />} />
        <Route path="/sessoes/:idFilme" element={<TelaSessoes />} />
        <Route
          path="/assentos/:idSessao"
          element={
            <TelaAssentos finalizar={(reserva) => setReserva(reserva)} />
          }
        />
        <Route path="/sucesso" element={<TelaSucesso reserva={reserva} />} />
      </Routes>
    </BrowserRouter>
  );
}

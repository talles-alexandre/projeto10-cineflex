import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Dia from "./Dia";

export default function TelaSessoes() {
  const { idFilme } = useParams();
  const URL = `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`;
  const [filme, setFilme] = useState(null);

  useEffect(() => {
    const promise = axios.get(URL);
    promise.then((response) => {
      const { data } = response;
      setFilme(data);
    });
    promise.catch((err) => {
      alert("Deu Ruim");
    });
  }, []);

  const sessoesDias = renderizaSessoes();

  function renderizaSessoes() {
    if (filme !== null) {
      return filme.days.map((dia) => {
        const { id, weekday, date, showtimes } = dia;
        return (
          <Dia key={id} dia={weekday} id={id} data={date} sessoes={showtimes} />
        );
      });
    } else {
      return <p>Carregando</p>;
    }
  }
  const footer = renderizarFooter();
  function renderizarFooter() {
    if (filme !== null) {
      const { posterURL, title } = filme;

      return (
        <>
          <img
            data-identifier="movie-img-preview"
            src={posterURL}
            alt={title}
          />
          <h1 data-identifier="movie-and-session-infos-preview">{title}</h1>
        </>
      );
    } else {
      return <></>;
    }
  }

  return (
    <Container>
      <h1>Selecione o horário</h1>
      <Dias>{sessoesDias}</Dias>
      <Footer>{footer}</Footer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 70px 30px;

  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    font-size: 24px;
  }
`;

const Dias = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Footer = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background-color: #dfe6ed;
  img {
    width: 48px;
    height: 72px;
    padding: 8px;
    background-color: white;
    border-radius: 2px;
    margin: 10px;
    box-shadow: 0px 2px 4px 0px #0000001a;
    border: ipx solid #9eadba;
  }
`;

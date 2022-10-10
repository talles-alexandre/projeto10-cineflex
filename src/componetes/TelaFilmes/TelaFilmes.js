import axios from "axios";
import { useEffect, useState } from "react";
import Filme from "./Filme";
import styled from "styled-components";

export default function TelaFilmes() {
  const URL = "https://mock-api.driven.com.br/api/v5/cineflex/movies";

  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const promise = axios.get(URL);
    promise.then((response) => {
      const { data } = response;
      setFilmes(data);
    });
    promise.catch((err) => {
      alert("Deu Ruim");
    });
  }, []);

  const renderizarFilmes = filmesParaExibir();
  function filmesParaExibir() {
    if (filmes.length > 0) {
      return filmes.map((filme) => {
        const { id, title, posterURL } = filme;
        return <Filme key={id} id={id} title={title} posterURL={posterURL} />;
      });
    } else {
      return <p>Carregando...</p>;
    }
  }

  return (
    <div>
      <Container>
        <h1>Selecione o filme</h1>
        <Filmes>{renderizarFilmes}</Filmes>
      </Container>
    </div>
  );
}
const Filmes = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const Container = styled.div`
  display: flex;
  margin: 70px 30px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    font-size: 24px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

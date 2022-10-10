import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Dia(props) {
  const { sessoes, data, dia } = props;

  const sessoesDisponiveis = renderizarSessoes();

  function renderizarSessoes() {
    return sessoes.map((sessao) => {
      const { id, name } = sessao;
      return (
        <Link key={id} to={`/assentos/${id}`}>
          <button data-identifier="hour-minute-btn">{name}</button>
        </Link>
      );
    });
  }

  return (
    <Container>
      <p data-identifier="session-date">
        {dia} - {data}
      </p>
      {sessoesDisponiveis}
    </Container>
  );
}
const Container = styled.div`
  margin: 10px 0;
  max-width: 500px;
  min-width: 375px;

  button {
    background-color: #e8833a;
    color: white;
    font-size: 18px;
    border-radius: 3px;
    border: 0;
    padding: 15px 20px;
    margin-right: 10px;
    cursor: pointer;
  }
  p {
    width: 100%;
    height: 60px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;

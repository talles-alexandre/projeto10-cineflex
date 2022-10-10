import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Assento from "./Assento";

export default function TelaAssentos(props) {
  const { idSessao } = useParams();
  const URL = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`;

  const [sessao, setSessao] = useState(null);
  const [selecionados, setSelecionados] = useState([]);

  const { finalizar } = props;

  const navigate = useNavigate();

  const [dadosCompra, setDadosCompra] = useState({ nome: "", cpf: "" });

  useEffect(() => {
    const promise = axios.get(URL);

    promise.then((response) => {
      const { data } = response;
      setSessao(data);
    });

    promise.catch((err) => {
      alert("Deu ruim");
    });
  }, []);

  function toggle(id, numero) {
    const jaSelecionado = selecionados.some((assento) => assento.id === id);
    if (!jaSelecionado) {
      setSelecionados([...selecionados, { id, numero }]);
    } else {
      const novosAssentos = selecionados.filter((assento) => assento.id !== id);
      setSelecionados(novosAssentos);
    }
  }

  function renderizarAssentos() {
    if (sessao !== null) {
      return sessao.seats.map((seat) => {
        const { id, name, isAvailable } = seat;
        const selecionado = selecionados.some((assento) => assento.id === id);
        return (
          <Assento
            key={id}
            id={id}
            numero={name}
            disponivel={isAvailable}
            selecionado={selecionado}
            aoSelecionar={(id, numero) => toggle(id, numero)}
          />
        );
      });
    } else {
      <p>Carregando...</p>;
    }
  }

  function confirmarCompra(event) {
    event.preventDefault();

    if (selecionados.length > 0) {
      const URL = `https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many`;
      const promise = axios.post(URL, {
        ids: selecionados.map((assento) => assento.id),
        name: dadosCompra.nome,
        cpf: dadosCompra.cpf,
      });

      promise.then((response) => {
        finalizar({
          filme: sessao.movie.title,
          dia: sessao.day.date,
          horario: sessao.name,
          assentos: selecionados,
          comprador: dadosCompra,
        });
        navigate("/sucesso");
      });

      promise.catch((err) => alert(err.response.statusText));
    } else {
      alert("Selecione pelo menos um assento!");
    }
  }

  function montarFormularioCompra() {
    return (
      <>
        <label htmlFor="nome">Nome do comprador:</label>
        <input
          data-identifier="buyer-name-input"
          type="text"
          id="nome"
          value={dadosCompra.nome}
          placeholder="Digite seu nome..."
          required
          onChange={(e) =>
            setDadosCompra({ ...dadosCompra, nome: e.target.value })
          }
        />
        <label htmlFor="cpf">CPF do comprador:</label>
        <input
          data-identifier="buyer-cpf-input"
          type="text"
          id="cpf"
          value={dadosCompra.cpf}
          placeholder="Digite seu CPF..."
          required
          onChange={(e) =>
            setDadosCompra({ ...dadosCompra, cpf: e.target.value })
          }
        />
        <div>
          <button data-identifier="reservation-btn">Reservar assento(s)</button>
        </div>
      </>
    );
  }

  const formularioCompra = montarFormularioCompra();
  const assentos = renderizarAssentos();
  const footer = renderizarFooter();
  function renderizarFooter() {
    if (sessao !== null) {
      const { posterURL, title } = sessao.movie;
      const { name } = sessao;
      const { weekday } = sessao.day;

      return (
        <>
          <img
            data-identifier="movie-img-preview"
            src={posterURL}
            alt={title}
          />
          <h1 data-identifier="movie-and-session-infos-preview">{title} - </h1>

          <h1 data-identifier="movie-and-session-infos-preview">-{weekday} </h1>
          <h1 data-identifier="movie-and-session-infos-preview">- {name}</h1>
        </>
      );
    } else {
      return <></>;
    }
  }

  return (
    <Container>
      <h1>Selecione o(s) assento(s)</h1>
      <Assentos>{assentos}</Assentos>
      <FormularioCompra onSubmit={confirmarCompra}>
        {formularioCompra}
      </FormularioCompra>
      <Footer>{footer}</Footer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 70px 30px;

  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    font-size: 24px;
  }
`;

const Assentos = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Legenda = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 60px;
`;

const AssentoLegenda = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    width: 26px;
    height: 26px;
    background-color: ${({ cor }) => cor || "#C3CFD9"};
    border: 1px solid #808f9d;
    border-radius: 50%;
  }
  p {
    margin-top: 5px;
    font-size: 13px;
  }
`;

const FormularioCompra = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: start;
  margin-bottom: 200px;
  * {
    margin: 5px 0;
  }
  input {
    width: 100%;
    height: 50px;
    padding-left: 20px;
  }
  button {
    width: 225px;
    background-color: #e8833a;
    color: white;
    border: 0;
    padding: 10px 5px;
    cursor: pointer;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
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

import styled from "styled-components";

export default function Assento(props) {
  const { id, numero, disponivel, selecionado, aoSelecionar } = props;

  function selecionarAssento() {
    if (!disponivel) alert("Esse assento não pode ser escolhido");
    else aoSelecionar(id, numero);
  }

  return (
    <Posicao
      data-identifier="seat"
      disponivel={disponivel}
      selecionado={selecionado}
      onClick={selecionarAssento}
    >
      {numero}
    </Posicao>
  );
}

function corAssento(selecionado, disponivel) {
  if (selecionado) return "#8DD7CF";
  else if (disponivel) return "#C3CFD9";
  else return "#FBE192";
}

const Posicao = styled.button`
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c3cfd9;
  border-radius: 50%;
  border: 1px solid #808f9d;
  background-color: ${({ selecionado, disponivel }) =>
    corAssento(selecionado, disponivel)};
  cursor: pointer;
  margin: 20px 7px;
  color: #222;
`;

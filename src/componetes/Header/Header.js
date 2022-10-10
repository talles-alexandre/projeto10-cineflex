import styled from "styled-components";

export default function Header() {
  return (
    <Topo>
      <h1>CineFlex</h1>
    </Topo>
  );
}
const Topo = styled.div`
  background-color: #c3cfd9;
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 34px;
    text-transform: uppercase;
    color: #e8833a;
  }
`;

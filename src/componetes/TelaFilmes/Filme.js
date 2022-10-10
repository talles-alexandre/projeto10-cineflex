import styled from "styled-components";
import { Link } from "react-router-dom";
export default function Filme(props) {
  const { id, title, posterURL } = props;
  return (
    <Link to={`/sessoes/${id}`}>
      <Post data-identifier="movie-outdoor">
        <img src={posterURL} alt={title} />
      </Post>
    </Link>
  );
}
const Post = styled.div`
  background-color: white;
  padding: 8px;
  box-shadow: opx 2px 4px 2px #0000001a;
  border-radius: 3px;
  margin: 10px 15px;
  cursor: pointer;
  img {
    width: 130px;
    height: 190px;
  }
`;

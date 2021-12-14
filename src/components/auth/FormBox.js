import styled from "styled-components";
import BaseBox from "../common/BaseBox";

const Container = styled(BaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10px;
  padding-top: 30px;
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 35px;
    width: 100%;
  }
`;

const FormBox = ({ children }) => {
  return (
    <Container>
      { children }
    </Container>
  );
}

export default FormBox;
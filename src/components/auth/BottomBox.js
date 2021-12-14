import { Link } from "react-router-dom";
import styled from "styled-components";
import BaseBox from "../common/BaseBox";

const SBottomBox = styled(BaseBox)`
  text-align: center;
  a {
    font-weight: 600;
    color: ${props => props.theme.accentColor};
    margin-left: 3px;
  }
`;


const BottomBox = ({ cta, link, linkText }) => {
  return (
    <SBottomBox>
      <span>{ cta }</span>
      <Link to={link}>{ linkText }</Link>
    </SBottomBox>
  );
}

export default BottomBox;
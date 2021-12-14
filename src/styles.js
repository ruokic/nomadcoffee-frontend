import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const lightFontColor = "#3c3c3c";
const darkFontColor = "#fefefe";
const lightBgColor = "#3c3c3c";
const darkBgColor = "#fefefe";
const borderColor = "#d2d2d2";

const accentColor = "#8e5f35";
const warningColor = "#e42a1e";

export const lightTheme = {
  fontColor: lightFontColor,
  bgColor: darkFontColor,
  accentColor,
  borderColor,
  warningColor
}

export const darkTheme = {
  fontColor: darkBgColor,
  bgColor: lightBgColor,
  accentColor,
  borderColor,
  warningColor
}

export const GlobalStyles = createGlobalStyle`
  ${reset}
  input {
    all: unset;
  }
  * {
    box-sizing: border-box;
  }
  body {
    background-color: ${props => props.theme.bgColor};
    font-size: 14px;
    color: ${props => props.theme.fontColor};
    font-family: sans-serif;
  }
  a {
    text-decoration: none;
  }
`;
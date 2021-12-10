import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const lightFontColor = "#3c3c3c";
const darkFontColor = "#fefefe";
const lightBgColor = "#3c3c3c";
const darkBgColor = "#fefefe";

export const lightTheme = {
  fontColor: lightFontColor,
  bgColor: darkFontColor
}

export const darkTheme = {
  fontColor: darkBgColor,
  bgColor: lightBgColor
}

export const GlobalStyles = createGlobalStyle`
  ${reset}

  body {
    background-color: ${props => props.theme.bgColor};
  }
`;
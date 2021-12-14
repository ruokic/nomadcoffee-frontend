import { gql, useMutation } from "@apollo/client";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faMugHot } from "@fortawesome/free-solid-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { logUserIn } from "../apollo";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/common/PageTitle";
import routes from "./routes";

const FacebookLogin = styled.div`
  color: #385385;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Notification = styled.div`
  text-color: ${props => props.theme.accentColor};
  border: 1px solid ${props => props.theme.accentColor};
  background-color: ${props => props.theme.bgColor};
  border-radius: 3px;
  padding: 5px;
  margin-top: 15px;
  width: 100%;
  text-align: center;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok,
      token,
      error
    }
  }
`;

const Login = () => {
  const location = useLocation();
  const { register, handleSubmit, formState: { errors, isValid }, getValues, setError, clearErrors } = useForm({
    mode: "onTouched",
    defaultValues: {
      username: location?.state?.username,
      password: location?.state?.password
    }
  });
  const onCompleted = (data) => {
    const { login: { ok, error, token }} = data;
    if (!ok) {
      return setError("result", {
        message: error
      });
    }
    if (token) {
      logUserIn(token);
    }
  }
  const [ login, { loading } ] = useMutation(LOGIN_MUTATION, {
    onCompleted
  });
  const onSubmitValid = (_) => {
    const { username, password } = getValues();
    if (loading) {
      return;
    }
    login({
      variables: {
        username,
        password
      }
    });
  }
  const onSubmitInvalid = (data) => {
    console.log(data, "invalid")
  }
  const clearLoginError = () => {
    clearErrors("result");
  }
  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faMugHot} size="3x" />
        </div>
        {location?.state?.message ? <Notification>
          {location?.state?.message}
        </Notification> : null}
        <form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
          <FormError message={errors?.result?.message} />
          <Input {
            ...register("username", { 
              required: "Username is Required...", 
              minLength: {
                value: 4,
                message: "Username should be longer than 4 chars."
              },
            })
          } type="text" 
            placeholder="Username" 
            hasError={Boolean(errors?.username?.message)} 
            onChange={() => clearLoginError()}
          />
          <FormError message={errors?.username?.message} />
          <Input {
            ...register("password", { 
              required: "Password is Required...", 
              minLength: {
                value: 4,
                message: "Password should be longer than 4 chars."
              },
            })
          } type="password" 
            placeholder="Password" 
            hasError={Boolean(errors?.password?.message)} 
            onChange={() => clearLoginError()}
          />
          <FormError message={errors?.password?.message} />
          <Button type="submit" value={loading ? "Loading..." : "Log in"} disabled={!isValid || loading} />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox cta="Don't have an account?" link={routes.signUp} linkText={"Sign up"} />
    </AuthLayout>
  );
}

export default Login;
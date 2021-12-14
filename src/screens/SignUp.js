import { gql, useMutation } from "@apollo/client";
import { faMugHot } from "@fortawesome/free-solid-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import FatLink from "../components/common/FatLink";
import PageTitle from "../components/common/PageTitle";
import routes from "./routes";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 16px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $name: String
    $email: String!
    $password: String!
  ) {
    createAccount(
      username: $username
      name: $name
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const navigate = useNavigate();
  const onCompleted = (data) => {
    const { createAccount: { ok, error }} = data;
    if (!ok) {
      return setError("result", {
        message: error
      });
    }
    const { username, password } = getValues();
    navigate(routes.home, { 
      state : {
        message: "Account Created Successfully.",
        username,
        password
      }
    });
  }
  const [ createAccount, { loading } ] = useMutation(CREATE_ACCOUNT_MUTATION, { onCompleted });
  const { register, handleSubmit, formState: { errors, isValid }, getValues, setError, clearErrors } = useForm({
    mode: "onTouched"
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    const { username, name, email, password } = data;
    createAccount({
      variables: {
        username,
        name,
        email,
        password
      }
    });
  }
  const clearSignUpError = () => {
    clearErrors("result");
  }
  return (
    <AuthLayout>
      <PageTitle title="SignUp" />
      <FormBox>
        <FontAwesomeIcon icon={faMugHot} size="3x" />
        <HeaderContainer>
          <Subtitle>
            Sign up to see coffeeshops and photos
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <FormError message={errors?.result?.message} />
          <Input {
            ...register("username", { 
              required: "Username is Required...", 
              minLength: {
                value: 4,
                message: "Username should be longer than 4 chars."
              },
            })
          }
            type="text" 
            placeholder="Username" 
            hasError={Boolean(errors?.username?.message)} 
            onChange={() => clearSignUpError()}
          />
          <FormError message={errors?.username?.message} />
          <Input {
            ...register("name", { 
              required: "Name is Required...", 
              minLength: {
                value: 2,
                message: "Name should be longer than 2 chars."
              },
            })
          }
            type="text" 
            placeholder="Name" 
            hasError={Boolean(errors?.name?.message)} 
            onChange={() => clearSignUpError()}
          />
          <FormError message={errors?.name?.message} />
          <Input {
            ...register("email", { 
              required: "Email is Required...", 
              minLength: {
                value: 4,
                message: "Email should be longer than 4 chars."
              },
            })
          }
            type="text" 
            placeholder="Email" 
            hasError={Boolean(errors?.email?.message)} 
            onChange={() => clearSignUpError()}
          />
          <FormError message={errors?.email?.message} />
          <Input {
            ...register("password", { 
              required: "Password is Required...", 
              minLength: {
                value: 4,
                message: "Password should be longer than 4 chars."
              },
            })
          }
            type="password" 
            placeholder="Password" 
            hasError={Boolean(errors?.password?.message)} 
            onChange={() => clearSignUpError()}
          />
          <FormError message={errors?.password?.message} />
          <Button type="submit" value={loading ? "Loading..." : "Sign Up"} disabled={!isValid || loading} />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" link={routes.home} linkText={"Log in"} />
    </AuthLayout>
  );
}

export default SignUp;
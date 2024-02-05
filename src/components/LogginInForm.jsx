import { Link, useNavigate, } from "react-router-dom";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./CommonStyledComponent";
import { useState } from "react";
import { useEffect } from "react";


export function LogginForm() {
  const navigate = useNavigate();


  // Define the state for the login form inputs
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = existingUsers.find(
      (user) => user.email === input.email && user.password === input.password
    );

    if (user) {
      localStorage.setItem("userId", user.id); 
      navigate("/home");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  }
 const userId = JSON.parse(localStorage.getItem("userId"));
  useEffect(() => {
if(userId){
navigate("/home");
}

  }, [userId])
  

  return (
    <BoxContainer>
      <FormContainer onSubmit={handleLogin} data-testid="login-form">
        <h1>Login</h1>
        <Input
          type="email"
          name="email"
          value={input.email}
          onChange={(e) => setInput({ ...input, email: e.target.value })}
          placeholder="Email"
        />
        <Input
          type="password"
          name="password"
          value={input.password}
          onChange={(e) => setInput({ ...input, password: e.target.value })}
          placeholder="Password"
        />
        <MutedLink>Forget your password?</MutedLink>
        <SubmitButton type="submit">Signin</SubmitButton>
        <MutedLink>
          Don't have an account?
          <BoldLink>
            <Link to="/signup">Signup</Link>
          </BoldLink>
        </MutedLink>
      </FormContainer>
    </BoxContainer>
  );
}

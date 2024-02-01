import { Link, useNavigate } from "react-router-dom";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./CommonStyledComponent";
import { useState } from "react";

export function SigupForm() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  const id = Date.now();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new user object
    const newUser = {
      id, 
      name: input.name,
      email: input.email,
      password: input.password,
    };
   // Check for duplicate Data in array
   const isDuplicateEmail = existingUsers.some(user => user.email === newUser.email);
   if (isDuplicateEmail) {
     alert("Email is already in use. Please choose another.");
     return; 
   }
    // Add the new user to the existing users
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    navigate("/");
  };

 

  return (
    <BoxContainer>
      <FormContainer onSubmit={handleSubmit}>
        <h1>SignUp</h1>
        <Input
          name="name"
          value={input.name}
          onChange={(e) => setInput({ ...input, name: e.target.value })}
          type="text"
          placeholder="Full Name"
        />
        <Input
          name="email"
          value={input.email}
          onChange={(e) => setInput({ ...input, email: e.target.value })}
          type="email"
          placeholder="Email"
        />
        <Input
          name="password"
          value={input.password}
          onChange={(e) => setInput({ ...input, password: e.target.value })}
          type="password"
          placeholder="Password"
        />
        <Input
          name="confirm_password"
          value={input.cpassword}
          onChange={(e) => setInput({ ...input, cpassword: e.target.value })}
          type="password"
          placeholder="Confirm Password"
        />
        <SubmitButton type="submit">Signup</SubmitButton>
        <MutedLink>
          Already have an account?
          <BoldLink>
            <Link to="/">Signin</Link>
          </BoldLink>
        </MutedLink>
      </FormContainer>
    </BoxContainer>
  );
}

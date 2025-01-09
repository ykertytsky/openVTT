import React, { useState } from "react";

import {
  FlexGrid,
  Row,
  Column,
  Button,
  TextInput,
  PasswordInput,
  Checkbox,
  Link,
  InlineNotification,
} from "@carbon/react";

import { ArrowRight } from "@carbon/icons-react";
import { supabase } from "../../supabaseClient"; // Ensure you have this set up

import "./LoginPage.scss";

const Login: React.FC = () => {
  const [email, setEmail] = useState(""); // For tracking email/nickname
  const [password, setPassword] = useState(""); // For tracking password
  const [error, setError] = useState(""); // To display any login errors
  const [loading, setLoading] = useState(false); // To track loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email, // Pass the email from state
      password, // Pass the password from state
    });

    if (error) {
      setError(error.message); // Display error
    } else {
      console.log("Login successful!");
      // Perform any post-login actions like navigation
    }

    setLoading(false);
  };

  return (
    <FlexGrid>
      <Row>
        <Column className="login_form">
          <h1>Your next adventure awaits</h1>
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <TextInput
                id="nickname"
                type="text"
                labelText="Nickname or Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <PasswordInput
                id="password"
                type="password"
                labelText="Password"
                autoComplete="true"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="utilities">
              <Checkbox id="checkbox" labelText="Remember me" />
              <Link href="#" renderIcon={ArrowRight}>
                Forgot Password?
              </Link>
            </div>
            {error && (
              <InlineNotification
                kind="error"
                title="Login failed"
                subtitle={error}
                lowContrast
              />
            )}
            <div className="login_button">
              <Button
                renderIcon={ArrowRight}
                size="lg"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging In..." : "Log In"}
              </Button>
            </div>
          </form>
          <div className="divider">
            <hr />
          </div>
          <div className="register">
            <span>Don't have an account yet?</span>
            <Button kind="tertiary" renderIcon={ArrowRight}>
              Register Now
            </Button>
          </div>
        </Column>
        <Column className="image_column">
          <div className="image">
            <img src="https://i.imgur.com/vhJbF7S.png" alt="" />
          </div>
        </Column>
      </Row>
    </FlexGrid>
  );
};

export default Login;

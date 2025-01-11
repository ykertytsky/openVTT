import React, { useState, useEffect } from "react";

import {
  FlexGrid,
  Row,
  Column,
  Button,
  TextInput,
  Checkbox,
  Link,
  InlineNotification,
} from "@carbon/react";

import { ArrowRight } from "@carbon/icons-react";
import { supabase } from "../../supabaseClient"; // Ensure you have this set up

import "./Registration.scss";

const Registration: React.FC = () => {
  const [email, setEmail] = useState(""); 
  const [display_name, setDisplayName] = useState("");
  const [password, setPassword] = useState(""); 
  const [confirm_password, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const [validationErrors, setValidationErrors] = useState({
    display_name: "",
    email: "",
    password: "",
    confirm_password: "",
    terms: "",
    privacy: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const validateDisplayName = (name: string) => {
    if (name.length < 3) {
      return "Display name must be at least 3 characters long";
    }
    if (name.length > 30) {
      return "Display name must not exceed 30 characters";
    }
    return "";
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Password must contain at least one number";
    }
    return "";
  };

  const validateConfirmPassword = (confirmPass: string) => {
    if (confirmPass !== password) {
      return "Passwords do not match";
    }
    return "";
  };

  useEffect(() => {
    const errors = {
      display_name: validateDisplayName(display_name),
      email: validateEmail(email),
      password: validatePassword(password),
      confirm_password: validateConfirmPassword(confirm_password),
      terms: !termsAccepted ? "You must accept the Terms of Service" : "",
      privacy: !privacyAccepted ? "You must accept the Privacy Policy" : "",
    };
    setValidationErrors(errors);

    const isValid = Object.values(errors).every((error) => error === "") &&
      display_name !== "" &&
      email !== "" &&
      password !== "" &&
      confirm_password !== "" &&
      termsAccepted &&
      privacyAccepted;

    setIsFormValid(isValid);
  }, [display_name, email, password, confirm_password, termsAccepted, privacyAccepted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else {
        console.log("Registration successful!");
        window.location.href = '/';
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlexGrid>
      <Row>
        <Column className="registration_form">
          <h1 className="">Forge Your Legend!</h1>
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <TextInput
                id="display_name"
                type="text"
                labelText="Display Name"
                value={display_name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDisplayName(e.target.value)}
                invalid={!!validationErrors.display_name}
                invalidText={validationErrors.display_name}
                required
              />
              <TextInput
                id="email"
                type="email"
                labelText="Your Email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                invalid={!!validationErrors.email}
                invalidText={validationErrors.email}
                required
              />
              <TextInput
                id="password"
                type="password"
                labelText="Password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                invalid={!!validationErrors.password}
                invalidText={validationErrors.password}
                required
              />
              <TextInput
                id="confirm_password"
                type="password"
                labelText="Confirm Password"
                value={confirm_password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                invalid={!!validationErrors.confirm_password}
                invalidText={validationErrors.confirm_password}
                required
              />
            </div>
            <div>
              <div className="flex items-center mb-4">
                <Checkbox
                  id="terms"
                  labelText="I agree to the"
                  className="max-w-fit mr-1"
                  checked={termsAccepted}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>, {checked}: {checked: boolean}) => setTermsAccepted(checked)}
                />
                <Link>Terms of Service</Link>
                {validationErrors.terms && (
                  <span className="cds--form-requirement ml-2">{validationErrors.terms}</span>
                )}
              </div>
              <div className="flex items-center mb-4">
                <Checkbox
                  id="privacy"
                  labelText="I agree to the"
                  className="max-w-fit mr-1"
                  checked={privacyAccepted}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>, {checked}: {checked: boolean}) => setPrivacyAccepted(checked)}
                />
                <Link>Privacy Policy</Link>
                {validationErrors.privacy && (
                  <span className="cds--form-requirement ml-2">{validationErrors.privacy}</span>
                )}
              </div>
            </div>
            {error && (
              <InlineNotification
                kind="error"
                title="Login failed"
                subtitle={error}
                lowContrast
              />
            )}
            <div className="register_button">
              <Button
                renderIcon={ArrowRight}
                size="lg"
                type="submit"
                disabled={loading || !isFormValid}
              >
                {loading ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>
          <div className="divider">
            <hr />
          </div>
          <div className="register">
            <span>Already have an Account?</span>
            <Button kind="tertiary" renderIcon={ArrowRight} href="/login" className="register_button">
              Login Now
            </Button>
          </div>
        </Column>
        <div className="image_column">
        </div>
      </Row>
    </FlexGrid>
  );
};

export default Registration;

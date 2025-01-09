import React from 'react';

import {
  FlexGrid,
  Row,
  Column,
  Button,
  TextInput,
  PasswordInput,
  Checkbox,
  Link
} from "@carbon/react";

import { ArrowRight } from '@carbon/icons-react';

import './LoginPage.scss'

const Login: React.FC = () => {
  return (
    <FlexGrid>
      <Row>
        <Column className="login_form">
          <h1>Your next adventure awaits</h1>
          <form action="#">
            <div className="inputs">
              <TextInput
                id="nickname"
                type="text"
                labelText="Nickname or Email"
              />
              <PasswordInput
                id="password"
                type="text"
                labelText="Password"
                autocomplete="true"
              />
            </div>
            <div className="utilities">
              <Checkbox id="checkbox" labelText="Remember me" />
              <Link href="#" renderIcon={ArrowRight}>
                Forgot Password?
              </Link>
            </div>
            <div className="login_button">
              <Button renderIcon={ArrowRight} size="lg">
                Log In
              </Button>
            </div>
          </form>
          <div className="divider">
            <hr />
          </div>
          <div className="register">
            <span>Dont have account yet?</span>
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
}

export default Login;
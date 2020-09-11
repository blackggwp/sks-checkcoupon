import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { usersSelector } from "../slices/users";
import { fetchLogin } from "../slices/users";
import { Redirect } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";

export default function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const dispatch = useDispatch();
  const { loginText } = useSelector(usersSelector);

  useEffect(() => {
    if (username.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [username, password]);

  const handleLogin = async () => {
    if (username.length > 1 && password.length > 1) {
      const postData = { username: username, password: password }
      dispatch(fetchLogin(postData))
    }
  }

  const handleKeyPress = (e) => {
    (e.keyCode === 13 || e.which === 13) &&
      (isButtonDisabled || handleLogin())
  }

  return localStorage.getItem('isLogin') ? (
    <Redirect
      to={{
        pathname: "/",
        state: { from: props.location },
      }}
    />
  ) : (
    <>
        <form noValidate autoComplete="off">
          <Card>
            <CardHeader title="Login" />
            <CardContent>
              <div>
                <TextField
                  fullWidth
                  id="input_username"
                  type="text"
                  label="username"
                  placeholder="username"
                  margin="normal"
                  error={loginText !== ''}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e)}
                />
                <TextField
                  fullWidth
                  id="input_userpass"
                  type="password"
                  label="password"
                  placeholder="password"
                  margin="normal"
                  error={loginText !== ''}
                  helperText={loginText}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e)}
                />
              </div>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                onClick={() => handleLogin()}
                disabled={isButtonDisabled}
              >
                Login
              </Button>
            </CardActions>
          </Card>
        </form>
        <br />
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => props.history.push("/")}
        >
          Back
        </Button>
      </>
  )
}

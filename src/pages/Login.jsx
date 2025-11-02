import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import GradientText from "../components/GradientText.jsx";
import { useLoginMutation } from "../api/auth.js";

const initialState = {
  email: "",
  password: ""
};

const Login = () => {
  const [form, setForm] = useState(initialState);
  const loginMutation = useLoginMutation();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginMutation.mutate(form, {
      onSuccess: () => {
        navigate("/growth-path", { replace: true });
      }
    });
  };

  const disabled =
    loginMutation.isLoading ||
    !form.email.trim() ||
    form.password.length < 8;

  return (
    <div className="page-container">
      <GradientText as="h1">Welcome back to SelfLink</GradientText>
      <p>
        Reconnect with your mentor, resonance circles, and guided rituals. Enter your credentials to
        re-open the sanctuary.
      </p>
      <Card title="Sign in" subtitle="Continue your journey">
        <form className="form" onSubmit={handleSubmit} noValidate>
          <label className="form__field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </label>
          <label className="form__field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
              minLength={8}
              required
            />
          </label>
          {loginMutation.isError && (
            <p role="alert" className="form__error">
              {loginMutation.error?.response?.data?.message ?? "Login failed. Please try again."}
            </p>
          )}
          <Button type="submit" disabled={disabled} loading={loginMutation.isLoading}>
            Sign in
          </Button>
        </form>
        <p className="form__meta">
          Need an account? <Link to="/register">Register here</Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;

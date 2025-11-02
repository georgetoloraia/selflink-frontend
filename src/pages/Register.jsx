import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import GradientText from "../components/GradientText.jsx";
import { useRegisterMutation } from "../api/auth.js";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  intention: ""
};

const Register = () => {
  const [form, setForm] = useState(initialState);
  const registerMutation = useRegisterMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    registerMutation.mutate(form);
  };

  const disabled =
    registerMutation.isLoading ||
    !form.fullName ||
    !form.email ||
    form.password.length < 8;

  return (
    <div className="page-container">
      <GradientText as="h1">Create your SelfLink presence</GradientText>
      <p>
        We honor intentional entry. Share your focus and we will tune your space with aligned
        rituals, mentors, and reflections.
      </p>
      <Card title="Registration" subtitle="Step into the sanctuary">
        <form className="form" onSubmit={handleSubmit} noValidate>
          <label className="form__field">
            <span>Full name</span>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </label>
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
          <label className="form__field">
            <span>Intention for SelfLink</span>
            <textarea
              name="intention"
              value={form.intention}
              onChange={handleChange}
              placeholder="I am seeking..."
              rows={4}
            />
          </label>
          {registerMutation.isError && (
            <p role="alert" className="form__error">
              {registerMutation.error?.message ?? "Registration failed. Please try again."}
            </p>
          )}
          {registerMutation.isSuccess && (
            <p role="status" className="form__success">
              Welcome. We have sent you a confirmation email with your activation ritual.
            </p>
          )}
          <Button type="submit" disabled={disabled} loading={registerMutation.isLoading}>
            Secure my space
          </Button>
        </form>
        <p className="form__meta">
          Already with us? <Link to="/login">Sign in</Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;

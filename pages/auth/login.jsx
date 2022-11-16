import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { login } from "../../redux/actions/auth";
import { createToast } from "../../utils/createToast";
import Banner from "../../components/Auth/Banner";
import LoginForm from "../../components/Auth/Login";

const Login = () => {
  const router = useRouter();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onInputChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setErrors([{ msg: "All field required (*) must be filled" }]);
    } else {
      setErrors([]);
      setIsLoading(true);

      const loginStatus = await login(form, setErrors);
      if (loginStatus) {
        createToast("Login Success", "success");
        router.push("/");
      }

      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Hiring App - Login</title>
        <meta name="description" content="Login page for Hiring App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container-fluid">
        <div className="row">
          <Banner />
          <LoginForm
            form={form}
            onInputChange={onInputChange}
            onSubmit={onSubmit}
            isLoading={isLoading}
            errors={errors}
          />
        </div>
      </div>
    </>
  );
};

export default Login;

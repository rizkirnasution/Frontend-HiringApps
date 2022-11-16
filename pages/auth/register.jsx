import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { register } from "../../redux/actions/auth";
import { createToast } from "../../utils/createToast";
import Banner from "../../components/Auth/Banner";
import RegisterForm from "../../components/Auth/Register";

const RegisterRecruiter = () => {
  const router = useRouter();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "",
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

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.role ||
      !form.password
    ) {
      setErrors([{ msg: "All field required (*) must be filled" }]);
    } else {
      // belum
      setErrors([]);
      setIsLoading(true);

      const registerStatus = await register(form, setErrors, true);
      if (registerStatus) {
        createToast(
          "Register Success!, Please Login!",
          "success"
        );
        router.push("/auth/login");
      }

      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Hiring App - Register</title>
        <meta
          name="description"
          content="Register page for Hiring App"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container-fluid">
        <div className="row">
          <Banner />
          <RegisterForm
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

export default RegisterRecruiter;

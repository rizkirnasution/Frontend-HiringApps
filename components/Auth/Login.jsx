import Link from "next/link";
import React from "react";
import Image from "next/legacy/image";
import styles from "../../styles/Auth.module.css";
import Logo from "../../public/image/logo.png";

export default function LoginForm({
  form,
  onInputChange,
  onSubmit,
  isLoading,
  errors,
}) {
  return (
    <div className={`${styles.auth} ${styles.login} col-sm-7 col-md-6`}>
      <div className={styles.content}>
        <div className="d-sm-none text-center mb-5">
          <Link href="/" legacyBehavior>
            <div className="d-flex justify-content-center align-items-center">
              <div style={{ position: "relative", height: 40, width: 40 }}>
                <Image
                  src={Logo}
                  alt="Hiring App Logo"
                  fill
                  sizes="100vw"
                  style={{
                    maxWidth: "100%",
                    height: "auto"
                  }} />
              </div>
              <p className="ms-2 mt-3">Hiring App</p>
            </div>
          </Link>
        </div>
        <h1 className="fs-4 fw-bold mb-3">Hello, Pewpeople</h1>
        <h2 className="fs-6 text-secondary mb-4">
          Login with your existing an account.
        </h2>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              type="email"
              className="form-control form-control-sm p-3"
              id="email"
              placeholder="Masukkan alamat E-mail"
              value={form.email}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control form-control-sm p-3"
              id="password"
              placeholder="Masukkan Password"
              value={form.password}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="d-flex justify-content-end mb-3">
            <Link href="/auth/forgot" className="text-secondary">
              Forgot Password?
            </Link>
          </div>
          {errors.length > 0 && (
            <div className="alert alert-danger mx-0 py-2">
              <ul className="m-0">
                {errors.map((error, index) => (
                  <li key={index}>{error.msg}</li>
                ))}
              </ul>
            </div>
          )}
          {isLoading ? (
            <button
              className="btn w-100 text-light mb-2"
              type="submit"
              style={{ backgroundColor: "#FBB017" }}
              disabled
            >
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className="btn w-100 text-light mb-2"
              style={{ backgroundColor: "#FBB017" }}
            >
              Login
            </button>
          )}
        </form>
        <p className="text-center text-secondary mt-4">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-orange text-decoration-none">
            Create Here!
          </Link>
        </p>
        <br />
      </div>
    </div>
  );
}

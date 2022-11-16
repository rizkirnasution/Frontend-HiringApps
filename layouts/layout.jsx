import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout({ token, id, children }) {
  return (
    <>
      <Navbar token={token} id={id} />
      <main>{children}</main>
      <Footer />
    </>
  );
}

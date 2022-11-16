import Link from "next/link";
import React from "react";
import Image from "next/legacy/image";
import styles from "../../styles/Auth.module.css";
import Logo from "../../public/image/logo-white.png";

export default function Banner() {
  return (
    <div className={`${styles.side} col-sm-5 col-md-6 d-none d-sm-flex`}>
      <div
        className={`${styles.content} mx-1 mx-md-2 mx-lg-5 text-white w-100`}
      >
        <div className={styles.icon}>
          <Link href="/" legacyBehavior>

            <div className="d-flex align-items-center">
              <div style={{ position: "relative", height: 40, width: 40 }}>
                <Image src={Logo} alt="Hiring App Logo" fill sizes="100vw" />
              </div>
              <p className="ms-2 mt-3 text-white">Hiring App</p>
            </div>

          </Link>
        </div>
        <h1 className="fw-bold">
          Temukan developer berbakat & terbaik di berbagai bidang keahlian
        </h1>
      </div>
    </div>
  );
}
import React from "react";
import styles from "../../styles/Home.module.css";

export default function Home4() {
  return (
    <div className={`container ${styles["invitation-container"]}`}>
      <div className={styles.invitation}>
        <div className="d-block d-md-flex justify-content-between">
          <h3 style={{ maxWidth: "300px" }}>Lorem ipsum dolor sit amet.</h3>
          <br />
          <div className="d-flex align-items-center">
            <button className="btn bg-light py-3">Mulai Dari Sekarang</button>
          </div>
        </div>
      </div>
    </div>
  );
}

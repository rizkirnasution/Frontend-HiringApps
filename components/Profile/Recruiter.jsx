import {
    FaMapMarkerAlt,
    FaInstagram,
    FaLinkedin,
    FaRegEnvelope,
    FaGithub,
} from "react-icons/fa";
import styles from "../../styles/Profile.module.css";
import Link from "next/link";
import Image from "next/legacy/image";

export default function ProfileRecruiter({ id, detailUser }) {
    return (
        <div className="container-fluid p-0 mb-4">
            <div className={styles["back-purple"]}></div>
            <div className="row mx-auto" style={{ maxWidth: "650px" }}>
                <div className="col-12">
                    <div
                        className={`${styles["profile-left"]} w-100 p-3 text-center`}
                        style={{ border: "1px solid gray" }}
                    >
                        <div
                            className="mx-auto"
                            style={{ position: "relative", height: 120, width: 120 }}
                        >
                            {detailUser.data.photo ? (
                                <Image
                                    src={detailUser.data.photo}
                                    className="rounded-circle"
                                    layout="fill"
                                    alt="Gambar Profile"
                                    unoptimized={true}
                                />
                            ) : (
                                <Image
                                    src={`https://ui-avatars.com/api/${detailUser.data.name}?`}
                                    className="rounded-circle"
                                    layout="fill"
                                    alt="Gambar Profile"
                                />
                            )}
                        </div>
                        <h5 className="mt-3">{detailUser.data.name} | {detailUser.data.company_name}</h5>
                        {detailUser.data.position && (
                            <div className="mb-1">
                                <small>{detailUser.data.position}</small>
                            </div>
                        )}
                        {detailUser.data.address && (
                            <div className="text-secondary">
                                <small>
                                    <FaMapMarkerAlt /> {detailUser.data.address}
                                </small>
                            </div>
                        )}
                        {detailUser.data.description && (
                            <div className="text-secondary mt-2">
                                <small>{detailUser.data.description}</small>
                            </div>
                        )}
                        {id === detailUser.data.id && (
                            <Link
                                href={`/profile/edit/${detailUser.data.id}`}
                                className="btn mt-3 text-white w-100"
                                style={{ backgroundColor: "#5E50A1" }}>

                                Edit Profile

                            </Link>
                        )}
                        {detailUser.data.email && (
                            <div className="text-secondary">
                                <FaRegEnvelope /> <small>{detailUser.data.email}</small>
                            </div>
                        )}
                        {detailUser.data.instagram && (
                            <div className="text-secondary">
                                <FaInstagram /> <small>{detailUser.data.instagram}</small>
                            </div>
                        )}
                        {detailUser.data.github && (
                            <div className="text-secondary">
                                <FaGithub /> <small>{detailUser.data.github}</small>
                            </div>
                        )}
                        {detailUser.data.linkedin && (
                            <div className="text-secondary">
                                <FaLinkedin /> <small>{detailUser.data.linkedin}</small>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
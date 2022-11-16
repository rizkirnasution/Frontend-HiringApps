import { useRouter } from "next/router";
import Image from "next/legacy/image";
import moment from "moment";
import Swal from "sweetalert2";
import Link from "next/link";
import {
    FaMapMarkerAlt,
    FaInstagram,
    FaLinkedin,
    FaRegEnvelope,
    FaGithub,
} from "react-icons/fa";
import axios from "axios";
import styles from "../../styles/Profile.module.css";

export default function ProfileWorker({
    token,
    id,
    isPorto,
    detailUser,
}) {
    const router = useRouter();

    const deletePorto = async (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.delete(
                        `${process.env.NEXT_PUBLIC_API_URL}/project/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            // withCredentials: true,
                        }
                    );

                    Swal.fire(
                        "Deleted!",
                        "Your portofolio has been deleted.",
                        "success"
                    ).then(() => {
                        location.reload();
                    });
                }
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
            });
        }
    };

    const deleteExp = async (id) => {
        try {
            // const token = context.req.cookies.token;
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.delete(
                        `${process.env.NEXT_PUBLIC_API_URL}/experience/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            // withCredentials: true,
                        }
                    );

                    Swal.fire(
                        "Deleted!",
                        "Your experience has been deleted.",
                        "success"
                    ).then(() => {
                        location.reload();
                    });
                }
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
            });
        }
    };

    return (
        <div className="container-fluid p-0 mb-4">
            <div className={styles["back-purple"]}></div>
            <div className="row mx-auto" style={{ maxWidth: "1200px" }}>
                <div className="col-12 col-md-4">
                    <div
                        className={`${styles["profile-left"]} w-100 p-3`}
                        style={{ border: "1px solid gray" }}
                    >
                        <div
                            className="mx-auto"
                            style={{ position: "relative", height: 210, width: 200 }}
                        >
                            {detailUser.data.photo ? (
                                <Image
                                    src={detailUser.data.photo}
                                    className="rounded-circle"
                                    alt="Gambar Profile"
                                    unoptimized={true}
                                    layout='fill'
                                    sizes="100vw" />
                            ) : (
                                <Image
                                    src={`https://ui-avatars.com/api/${detailUser.data.name}?`}
                                    className="rounded-circle"
                                    alt="Gambar Profile"
                                    layout='fill'
                                    sizes="100vw" />
                            )}
                        </div>
                        <h5 className="mt-3">{detailUser.data.name}</h5>
                        {detailUser.data.job_desc && (
                            <div className="mb-1">
                                <small>{detailUser.data.job_desc}</small>
                            </div>
                        )}
                        {detailUser.data.address && (
                            <div className="text-secondary">
                                <small>
                                    <FaMapMarkerAlt /> {detailUser.data.address}
                                </small>
                            </div>
                        )}
                        {detailUser.data.job_type && (
                            <div className="text-secondary">
                                <small>{detailUser.data.job_type}</small>
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
                                className="btn btn-outline-secondary mt-4 my-2 text-black w-100 bg-purple">

                                Edit Profile

                            </Link>
                        )}
                        <h5 className="mt-3">Skills</h5>
                        <div className="my-2">
                            {detailUser.data.skills && (
                                <>
                                    {detailUser.data.skills.map((skill, index) => (
                                        <div
                                            key={detailUser.data.id + index}
                                            className={`${styles.skill} my-1 mx-1`}
                                        >
                                            {skill}
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                        {detailUser.data.email && (
                            <a
                                href={`mailto:${detailUser.data.email}`}
                                target="_blank"
                                className="text-secondary d-block"
                                rel="noreferrer"
                            >
                                <FaRegEnvelope /> <small>{detailUser.data.email}</small>
                            </a>
                        )}
                        {detailUser.data.instagram && (
                            <a
                                href={detailUser.data.instagram}
                                target="_blank"
                                className="text-secondary d-block"
                                rel="noreferrer"
                            >
                                <FaInstagram /> <small>{detailUser.data.instagram}</small>
                            </a>
                        )}
                        {detailUser.data.github && (
                            <a
                                href={detailUser.data.github}
                                target="_blank"
                                className="text-secondary d-block"
                                rel="noreferrer"
                            >
                                <FaGithub /> <small>{detailUser.data.github}</small>
                            </a>
                        )}
                        {detailUser.data.linkedin && (
                            <a
                                href={detailUser.data.linkedin}
                                target="_blank"
                                className="text-secondary d-block"
                                rel="noreferrer"
                            >
                                <FaLinkedin /> <small>{detailUser.data.linkedin}</small>
                            </a>
                        )}
                    </div>
                </div>
                <div className="col-12 col-md-8">
                    <div
                        className={`${styles["profile-right"]} w-100 p-3`}
                        style={{ border: "1px solid gray" }}
                    >
                        <div className="d-flex">
                            <Link href={`/profile/${detailUser.data.id}`} legacyBehavior>
                                <h5
                                    className={`${styles.tab} me-2 ${!isPorto && "text-secondary"
                                        }`}
                                >
                                    {/* <a>Portofolio</a> */}
                                    <button
                                     className="btn text-white w-100"
                                     style={{ backgroundColor: "#5E50A1" }}
              
                                    >
                                 Portofolio
                                 </button>
                                    
                                </h5>
                            </Link>
                            <Link href={`/profile/${detailUser.data.id}?tab=experience`} legacyBehavior>
                                <h5
                                    className={`${styles.tab} ms-2 ${isPorto && "text-secondary"
                                        }`}
                                     >
                                    {/* <a>Pengalaman kerja</a> */}
                                    <button
                                     className="btn text-white w-100"
                                     style={{ backgroundColor: "#5E50A1" }}
              
                                    >
                                    Experiences
                                 </button>
                                </h5>
                            </Link>
                        </div>
                        <hr />
                        {isPorto ? (
                            <>
                                {detailUser.data.projects.length ? (
                                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mb-4">
                                        {detailUser.data.projects.map((project) => (
                                            <div key={project.id} className="col">
                                                <div className="card">
                                                    <div
                                                        className="mx-auto"
                                                        style={{
                                                            position: "relative",
                                                            height: 100,
                                                            width: 100,
                                                        }}
                                                    >
                                                        {project.photo ? (
                                                            <Image
                                                                src={project.photo}
                                                                alt="Gambar Portofolio"
                                                                unoptimized={true}
                                                                layout='fill'
                                                                sizes="100vw" />
                                                        ) : (
                                                            <Image
                                                                src={`https://ui-avatars.com/api/${project.title}?`}
                                                                alt="Gambar Portofolio"
                                                                layout='fill'
                                                                sizes="100vw" />
                                                        )}
                                                    </div>
                                                    <div className="card-body">
                                                        <p className="card-title text-center">
                                                            {project.title} | {project.app_type}
                                                        </p>
                                                        {id === detailUser.data.id && (
                                                            <div className="d-flex justify-content-center mt-3">
                                                                <button
                                                                    onClick={() => deletePorto(project.id)}
                                                                    className="btn btn-sm btn-danger"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <h5>Portfolio Not Found.</h5>
                                )}
                            </>
                        ) : (
                            <>
                                {detailUser.data.experiences.length ? (
                                    <>
                                        {detailUser.data.experiences.map((exp) => (
                                            <>
                                                <div key={exp.id} className="row mb-3">
                                                    <div className="d-none d-sm-block col-12 col-sm-4 col-lg-3">
                                                        <div
                                                            className="mx-auto"
                                                            style={{
                                                                position: "relative",
                                                                height: 100,
                                                                width: 100,
                                                            }}
                                                        >
                                                            {exp.photo ? (
                                                                <Image
                                                                    src={exp.photo}
                                                                    alt="Gambar Profile"
                                                                    unoptimized={true}
                                                                    layout='fill'
                                                                    sizes="100vw" />
                                                            ) : (
                                                                <Image
                                                                    src={`https://ui-avatars.com/api/${exp.company}?`}
                                                                    alt="Gambar Profile"
                                                                    layout='fill'
                                                                    sizes="100vw" />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-8  col-lg-9">
                                                        <h5>{exp.position}</h5>
                                                        <p className="m-0">{exp.company}</p>
                                                        <p className="text-secondary">
                                                            <small>
                                                                {moment(exp.start_date).format("LL")}
                                                            </small>{" "}
                                                            -{" "}
                                                            <small>
                                                                {exp.end_date
                                                                    ? moment(exp.end_date).format("LL")
                                                                    : "Sekarang"}
                                                            </small>
                                                        </p>
                                                        <p>{exp.description}</p>
                                                        {id === detailUser.data.id && (
                                                            <div className="d-flex mb-3">
                                                                <button
                                                                    onClick={() => deleteExp(exp.id)}
                                                                    className="btn btn-sm btn-danger"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        ))}
                                    </>
                                ) : (
                                    <h5>Experience Not Found.</h5>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
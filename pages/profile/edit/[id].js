import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { FaMapMarkerAlt } from "react-icons/fa";
import styles from "../../../styles/Profile.module.css";
import {
  editProfile,
  editPhoto,
  editPhotoProject,
} from "../../../redux/actions/users";
import { createToast } from "../../../utils/createToast";
import ExperienceForm from "../../../components/Profile/Experience";
import ProjectForm from "../../../components/Profile/Project";
import Link from "next/link";

export async function getServerSideProps(context) {
  try {
    const id = context.query.id;
    const token = context.req.cookies.token;

    if (id !== context.req.cookies.id) {
      return {
        redirect: {
          permanent: false,
          destination: `/profile/${context.req.cookies.id}`,
        },
      };
    }

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // withCredentials: true,
      }
    );

    return {
      props: {
        data: res.data.data,
        token: context.req.cookies.token,
        isApiError: false,
        apiError: null,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
        token: context.req.cookies.token,
        isApiError: true,
        apiError: error.message,
      },
    };
  }
}

const Edit = ({ data, token, isApiError, apiError }) => {
  const router = useRouter();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: data.name || "",
    address: data.address || "",
    jobDesc: data.job_desc || "",
    jobType: data.job_type || "",
    description: data.description || "",
    phone: data.phone || "",
    instagram: data.instagram || "",
    github: data.github || "",
    linkedin: data.linkedin || "",
    skills: data.skills ? data.skills.join(",") : "",
    experiences: data.experiences || [],
    projects: data.projects || [],
  });
  const [photo, setPhoto] = useState(null);
  const [formRecruiter, setFormRecruiter] = useState({
    name: data.name || "",
    companyName: data.company_name || "",
    position: data.position || "",
    address: data.address || "",
    description: data.description || "",
    phone: data.phone || "",
    instagram: data.instagram || "",
    github: data.github || "",
    linkedin: data.linkedin || "",
  });

  const onInputChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const onInputRecruiterChange = (e) => {
    setFormRecruiter({
      ...formRecruiter,
      [e.target.id]: e.target.value,
    });
  };

  const photoChangeHandler = (e) => {
    setPhoto(e.target.files[0]);
  };

  const onSubmit = async () => {
    setErrors([]);
    setIsLoading(true);

    const editProfileStatus = await editProfile(
      data.id,
      token,
      {
        ...form,
        skills: form.skills ? form.skills.trim().split(",") : null,
      },
      setErrors
    );
    if (editProfileStatus) {
      createToast("Edit Profile Success", "success");
      router.push(`/profile/${data.id}`);
    }

    setIsLoading(false);
    document.getElementById("close").click();
  };

  const onSubmitRecruiter = async () => {
    setErrors([]);
    setIsLoading(true);

    const editProfileStatus = await editProfile(
      data.id,
      token,
      {
        ...formRecruiter,
      },
      setErrors
    );
    if (editProfileStatus) {
      createToast("Edit Profile Success", "success");
      router.push(`/profile/${data.id}`);
    }

    setIsLoading(false);
    document.getElementById("close").click();
  };

  const onSubmitPhoto = async () => {
    document.getElementById("close").click();

    const formData = new FormData();
    if (photo) {
      formData.append("photo", photo);
    }

    setErrors([]);
    setIsLoading(true);

    const editPhotoStatus = await editPhoto(
      data.id,
      token,
      formData,
      setErrors
    );
    if (editPhotoStatus) {
      createToast("Edit Photo Success", "success");
      router.push(`/profile/edit/${data.id}`);
    }

    setIsLoading(false);
  };

  const onSubmitPhotoProject = async () => {
    const formData = new FormData();
    if (photo) {
      formData.append("photo", photo);
    }

    setErrors([]);
    setIsLoading(true);

    const editPhotoStatus = await editPhotoProject(
      data.id,
      token,
      formData,
      setErrors
    );
    if (editPhotoStatus) {
      createToast("Edit Photo Success", "success");
      router.push(`/profile/edit/${data.id}`);
    }

    setIsLoading(false);
  };

  const addExp = () => {
    setForm({
      ...form,
      experiences: [
        ...form.experiences,
        {
          position: "",
          company: "",
          start_date: "",
          end_date: "",
          photo: "",
          description: "",
        },
      ],
    });
  };

  const setInputExp = (e, index) => {
    const newExp = form.experiences.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          [e.target.id]: e.target.value,
        };
      }

      return item;
    });

    setForm({
      ...form,
      experiences: newExp,
    });
  };

  const deleteInputExp = (index) => {
    const newExp = form.experiences.filter((item, i) => {
      if (i !== index) {
        return item;
      }
    });

    setForm({
      ...form,
      experiences: newExp,
    });
  };

  const addProject = () => {
    setForm({
      ...form,
      projects: [
        ...form.projects,
        {
          title: "",
          app_type: "",
          repo: "",
          photo: "",
        },
      ],
    });
  };

  const setInputProject = (e, index) => {
    const newProject = form.projects.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          [e.target.id]: e.target.value,
        };
      }

      return item;
    });

    setForm({
      ...form,
      projects: newProject,
    });
  };

  const deleteInputProject = (index) => {
    const newProject = form.projects.filter((item, i) => {
      if (i !== index) {
        return item;
      }
    });

    setForm({
      ...form,
      projects: newProject,
    });
  };

  return (
    <>
      <Head>
        <title>Hiring App - Edit Profile</title>
        <meta name="description" content="Edit Profile page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container-fluid p-0">
        <div className={styles["back-purple"]}></div>
        <div className="row mx-auto" style={{ maxWidth: "1200px" }}>
          {!isApiError ? (
            <>
              {data ? (
                <>
                  <div className="col-12 col-md-4">
                    <div
                      className={`${styles["profile-left"]} w-100 p-3`}
                      style={{ border: "1px solid gray" }}
                    >
                      <div
                        className="mx-auto"
                        style={{
                          position: "relative",
                          height: 120,
                          width: 120,
                        }}
                      >
                        {data.photo ? (
                          <Image
                            src={data.photo}
                            className="rounded-circle"
                            layout="fill"
                            alt="Gambar Profile"
                            unoptimized={true}
                          />
                        ) : (
                          <Image
                            src={`https://ui-avatars.com/api/${data.name}?`}
                            className="rounded-circle"
                            layout="fill"
                            alt="Gambar Profile"
                          />
                        )}
                      </div>

                      {!isLoading && (
                        <div className="d-flex justify-content-center mt-3">
                          <button
                            type="button"
                            className="btn mt-3 text-white w-100"
                            style={{ backgroundColor: "#5E50A1" }}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            Change Photo
                          </button>
                        </div>
                      )}

                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                Change Photo Profile
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <form>
                                <input
                                  type="file"
                                  className="form-control"
                                  onChange={photoChangeHandler}
                                />
                              </form>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                id="close"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                onClick={onSubmitPhoto}
                                className="btn btn-primary"
                              >
                                Save changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <h5 className="mt-3">{data.name}</h5>
                      {data.address && (
                        <div className="text-secondary">
                          <small>
                            <FaMapMarkerAlt /> {data.address}
                          </small>
                        </div>
                      )}
                      {data.position && (
                        <div className="text-secondary">
                          <small>{data.position}</small>
                        </div>
                      )}
                    </div>
                    {isLoading ? (
                      <button
                        className="btn mt-3 text-white w-100"
                        type="submit"
                        style={{ backgroundColor: "#5E50A1" }}
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
                      <>
                        {data.role === "recruiter" ? (
                          <button
                            className="btn mt-3 text-white w-100"
                            style={{ backgroundColor: "#5E50A1" }}
                            onClick={onSubmitRecruiter}
                          >
                            Simpan
                          </button>
                        ) : (
                          <button
                            className="btn mt-3 text-white w-100"
                            style={{ backgroundColor: "#5E50A1" }}
                            onClick={onSubmit}
                          >
                            Simpan
                          </button>
                        )}
                      </>
                    )}
                    <Link href={`/profile/${data.id}`} legacyBehavior>
                      <button
                        className="btn mt-3 w-100"
                        style={{ color: "#5E50A1", borderColor: "#5E50A1" }}
                      >
                        Batal
                      </button>
                    </Link>
                  </div>
                  {data.role === "recruiter" ? (
                    <div className="col-12 col-md-8">
                      <div
                        className={`${styles["profile-right"]} w-100 p-3`}
                        style={{ border: "1px solid gray" }}
                      >
                        {errors.length > 0 && (
                          <div className="alert alert-danger mx-0 py-2">
                            <ul className="m-0">
                              {errors.map((error, index) => (
                                <li key={index}>{error.msg}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {/* Data diri */}
                        <h5>Detail User</h5>
                        <hr />
                        <form className="mb-5">
                          <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                              Full Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              placeholder="Masukkan nama lengkap"
                              value={formRecruiter.name}
                              onChange={onInputRecruiterChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="companyName" className="form-label">
                              Company Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="companyName"
                              placeholder="Masukkan nama perusahaan"
                              value={formRecruiter.companyName}
                              onChange={onInputRecruiterChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="position" className="form-label">
                              Position
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="position"
                              placeholder="Masukkan Jabatan"
                              value={formRecruiter.position}
                              onChange={onInputRecruiterChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="address" className="form-label">
                              Address
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="address"
                              placeholder="Masukkan alamat"
                              value={formRecruiter.address}
                              onChange={onInputRecruiterChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="phone" className="form-label">
                              No. Handphone
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="phone"
                              placeholder="Masukkan no ponsel"
                              value={formRecruiter.phone}
                              onChange={onInputRecruiterChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                              Description
                            </label>
                            <textarea
                              className="form-control"
                              id="description"
                              cols="30"
                              rows="5"
                              placeholder="Masukkan deskripsi singkat"
                              onChange={onInputRecruiterChange}
                              value={formRecruiter.description}
                            ></textarea>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="github" className="form-label">
                              Github
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="github"
                              placeholder="Masukkan url github"
                              value={formRecruiter.github}
                              onChange={onInputRecruiterChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="linkedin" className="form-label">
                              Linkedin
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="linkedin"
                              placeholder="Masukkan url linkedin"
                              value={formRecruiter.linkedin}
                              onChange={onInputRecruiterChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="instagram" className="form-label">
                              Instagram
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="instagram"
                              placeholder="Masukkan url instagram"
                              value={formRecruiter.instagram}
                              onChange={onInputRecruiterChange}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  ) : (
                    <div className="col-12 col-md-8">
                      <div
                        className={`${styles["profile-right"]} w-100 p-3`}
                        style={{ border: "1px solid gray" }}
                      >
                        {errors.length > 0 && (
                          <div className="alert alert-danger mx-0 py-2">
                            <ul className="m-0">
                              {errors.map((error, index) => (
                                <li key={index}>{error.msg}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {/* Data diri */}
                        <h5>Detail User</h5>
                        <hr />
                        <form className="mb-5">
                          <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                              Full Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              placeholder="Masukkan nama lengkap"
                              value={form.name}
                              onChange={onInputChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="jobDesc" className="form-label">
                              Job Desc
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="jobDesc"
                              placeholder="Masukkan Job Desc"
                              value={form.jobDesc}
                              onChange={onInputChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="jobType" className="form-label">
                              Job Type
                            </label>
                            <select
                              className="form-select"
                              id="jobType"
                              value={form.jobType}
                              onChange={onInputChange}
                            >
                              <option value="Freelance">Freelance</option>
                              <option value="Fulltime">Fulltime</option>
                              <option value="Not Working">
                                Looking For Work
                              </option>
                            </select>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="address" className="form-label">
                              Address
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="address"
                              placeholder="Masukkan alamat"
                              value={form.address}
                              onChange={onInputChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="phone" className="form-label">
                              No.Handphone
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="phone"
                              placeholder="Masukkan no ponsel"
                              value={form.phone}
                              onChange={onInputChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                              Description
                            </label>
                            <textarea
                              className="form-control"
                              id="description"
                              cols="30"
                              rows="5"
                              placeholder="Masukkan deskripsi singkat"
                              onChange={onInputChange}
                              value={form.description}
                            ></textarea>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="github" className="form-label">
                              Github
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="github"
                              placeholder="Masukkan url github"
                              value={form.github}
                              onChange={onInputChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="linkedin" className="form-label">
                              Linkedin
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="linkedin"
                              placeholder="Masukkan url linkedin"
                              value={form.linkedin}
                              onChange={onInputChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="instagram" className="form-label">
                              Instagram
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="instagram"
                              placeholder="Masukkan url instagram"
                              value={form.instagram}
                              onChange={onInputChange}
                            />
                          </div>
                        </form>
                        {/* Skills */}
                        <h5>Skills</h5>
                        <hr />
                        <form className="mb-5">
                          <div className="mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="skills"
                              placeholder="Java, Python, Golang"
                              value={form.skills}
                              onChange={onInputChange}
                            />
                            <div id="skillHelp" className="form-text">
                              Pisahkan setiap skill menggunakan koma
                            </div>
                          </div>
                        </form>
                        {/* Experiences */}
                        <h5>Experiences</h5>
                        <hr />
                        {form.experiences.map((exp, index) => (
                          <div key={data.id + "exp" + index}>
                            <ExperienceForm
                              data={exp}
                              setInputExp={setInputExp}
                              deleteInputExp={deleteInputExp}
                              index={index}
                            />
                          </div>
                        ))}
                        <button
                          className="btn btn-outline-secondary mt-4 my-2 text-black w-100 bg-purple"
                        
                          onClick={addExp}
                        >
                          Add Your Experience
                        </button>
                        {/* Projects */}
                        <h5>Portofolio</h5>
                
                        <hr />
                        {form.projects.map((project, index) => (
                          <div key={data.id + "project" + index}>
                            <ProjectForm
                              data={project}
                              setInputProject={setInputProject}
                              photoChangeHandler={photoChangeHandler}
                              onSubmitPhotoProject={onSubmitPhotoProject}
                              deleteInputProject={deleteInputProject}
                              index={index}
                            />
                          </div>
                        ))}
                        <button
                          className="btn btn-outline-secondary mt-4 my-2 text-black w-100 bg-purple"
                          onClick={addProject}
                        >
                          Add Your Portfolio
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <h1>User Not Found.</h1>
              )}
            </>
          ) : (
            <h1>{apiError}</h1>
          )}
        </div>
      </div>
      <br />
    </>
  );
};

Edit.layout = "Layout";

export default Edit;

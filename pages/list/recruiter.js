import Link from "next/link";
import Head from "next/head";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaMapMarkerAlt } from "react-icons/fa";
import { wrapper } from "../../redux/store";
import {
  GET_LIST_RECRUITER_SUCCESS,
  GET_LIST_RECRUITER_FAILED,
} from "../../redux/actions/type";
import styles from "../../styles/Detail.module.css";
import Pagination from "../../components/Pagination";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    // get api and save to redux during ssr
    try {
      const token = context.req.cookies.token;
      let url = `${process.env.NEXT_PUBLIC_API_URL}/user/recruiter?`;

      // set search query if exist
      if (context.query.search) {
        url += `&search=${context.query.search}`;
      }

      // set sort query if exist
      if (context.query.sort) {
        url += `&orderBy=${context.query.sort}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // withCredentials: true,
      });

      store.dispatch({
        type: GET_LIST_RECRUITER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      store.dispatch({
        type: GET_LIST_RECRUITER_FAILED,
        payload: error.message,
      });
    }

    return {
      props: {
        token: context.req.cookies.token,
      },
    };
  }
);

const ListRecruiter = () => {
  const router = useRouter();
  const { listRecruiter } = useSelector((state) => state);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortQuery, setSortQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [workerPerPage] = useState(3);

  useEffect(() => {
    setSearchQuery("");
    if (router.query.search) {
      setSearchQuery(router.query.search);
    }

    if (router.query.sort) {
      setSortQuery(router.query.sort);
    }
  }, [router]);

  // useEffect untuk sort
  useEffect(() => {
    if (sortQuery) {
      applyFilter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortQuery]);

  const applyFilter = (page = "") => {
    let url = "/list/recruiter?";
    if (searchQuery) {
      url += `&search=${searchQuery}`;
    }
    if (sortQuery) {
      url += `&sort=${sortQuery}`;
    }

    router.push(url);
  };

  const search = (e) => {
    e.preventDefault();

    applyFilter();
  };

  const indexOfLastPost = currentPage * workerPerPage;
  const indexOfFirstPost = indexOfLastPost - workerPerPage;
  const currentPosts = listRecruiter.data.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Head>
        <title>Hiring App - List Worker</title>
        <meta name="description" content="List Worker page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.top}>
        <div className="container py-3">
          <h3 className="fw-bold m-0">Top Jobs</h3>
        </div>
      </div>
      <div className="container my-5" style={{ maxWidth: "800px" }}>
        <form className="d-flex mx-auto" onSubmit={search}>
          <input
            className="form-control p-2 me-2"
            type="search"
            placeholder="Cari berdasarkan nama, skill, job desk, address"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <select
            className="form-select me-2"
            onChange={(e) => setSortQuery(e.target.value)}
            style={{ width: "100px" }}
            value={sortQuery}
          >
            <option selected>Sort</option>
            <option value="name">Sort By Name</option>
            <option value="createdAt">
              Sort By Date
            </option>
          </select>
          <button className="btn bg-purple text-white" type="submit">
            Search
          </button>
        </form>
        <div className="mt-5 bg-white">
          {!currentPosts.isError ? (
            <>
              {!currentPosts.empty ? (
                <>
                  {currentPosts.map((recruiter) => (
                    <div
                      key={recruiter.id}
                      className={`${styles.worker} row p-3 mb-2 mx-3 mx-md-0`}
                    >
                      <div className="col-12 col-sm-6 col-md-9">
                        <div className="row">
                          <div className="col-sm-12 col-md-3 text-end my-2">
                            <div
                              style={{
                                position: "relative",
                                height: 120,
                                width: 120,
                              }}
                            >
                              {recruiter.photo ? (
                                <Image
                                  src={recruiter.photo}
                                  className="rounded-circle"
                                  alt="Gambar Profile"
                                  unoptimized={true}
                                  layout="fill"
                                  sizes="100vw"
                                  style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                  }}
                                />
                              ) : (
                                <Image
                                  src={`https://ui-avatars.com/api/${recruiter.name}?`}
                                  className="rounded-circle"
                                  alt="Gambar Profile"
                                  layout="fill"
                                  sizes="100vw"
                                  style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                  }}
                                />
                              )}
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-9 my-2">
                            <div className="d-flex align-items-center h-100">
                              <div>
                                <div className={styles.title}>
                                  {recruiter.name}
                                </div>
                                {recruiter.job_desc && (
                                  <small className="text-secondary">
                                    {recruiter.job_desc}
                                  </small>
                                )}
                                {recruiter.address && (
                                  <div className="text-secondary">
                                    <small>
                                      <FaMapMarkerAlt /> {recruiter.address}
                                    </small>
                                  </div>
                                )}
                                <div className="mt-2">
                                  {recruiter.skills && (
                                    <>
                                      {recruiter.skills.map((skill, index) => (
                                        <div
                                          key={recruiter.id + index}
                                          className={`${styles.skill} my-1 mx-1`}
                                        >
                                          {skill}
                                        </div>
                                      ))}
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6 col-md-3">
                        <div className="d-flex align-items-center justify-content-center h-100">
                          <Link
                            href={`/profile/${recruiter.id}`}
                            passHref
                            legacyBehavior
                          >
                            <a
                              className="btn mt-3 text-white w-100"
                              style={{ backgroundColor: "#5E50A1" }}
                            >
                              View Profile
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <h3>Data Not Found.</h3>
              )}
            </>
          ) : (
            <h3>{listRecruiter.error}</h3>
          )}
        </div>
        <Pagination
          workerPerPage={workerPerPage}
          totalWorker={listRecruiter.data.length}
          paginate={paginate}
        />
      </div>
    </>
  );
};

ListRecruiter.layout = "Layout";

export default ListRecruiter;

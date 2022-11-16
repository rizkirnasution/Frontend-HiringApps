import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { wrapper } from "../../redux/store";
import {
  GET_DETAIL_USER_FAILED,
  GET_DETAIL_USER_SUCCESS,
} from "../../redux/actions/type";
import ProfileWorker from "../../components/Profile/Worker";
import ProfileRecruiter from "../../components/Profile/Recruiter";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    // get api and save to redux during ssr
    try {
      const { id } = context.query;
      const token = context.req.cookies.token;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          // withCredentials: true,
        }
      );

      store.dispatch({
        type: GET_DETAIL_USER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      store.dispatch({
        type: GET_DETAIL_USER_FAILED,
        payload: error.message,
      });
    }

    return {
      props: {
        token: context.req.cookies.token,
        id: context.req.cookies.id,
      },
    };
  }
);

const Profile = ({ token, id }) => {
  const router = useRouter();
  const { detailUser } = useSelector((state) => state);
  const [isPorto, setisPorto] = useState(true);

  useEffect(() => {
    if (router.query.tab === "experience") {
      setisPorto(false);
    } else {
      setisPorto(true);
    }
  }, [router.query.tab]);

  return (
    <>
      <Head>
        <title>Hiring App - Profile</title>
        <meta name="description" content="Home page contains list worker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!detailUser.data.isError ? (
        <>
          {detailUser.data.id ? (
            <>
              {detailUser.data.role === "recruiter" ? (
                <ProfileRecruiter id={id} detailUser={detailUser} />
              ) : (
                <ProfileWorker
                  token={token}
                  id={id}
                  isPorto={isPorto}
                  detailUser={detailUser}
                />
              )}
            </>
          ) : (
            <h1 className="text-center mt-5">User Not Found.</h1>
          )}
        </>
      ) : (
        <h1 className="text-center mt-5">{detailUser.error}</h1>
      )}
      <br />
    </>
  );
};

Profile.layout = "Layout";

export default Profile;

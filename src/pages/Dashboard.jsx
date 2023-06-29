import { useEffect, useState } from "react";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";

import { db } from "../firebase";

const Dashboard = () => {
  const [tweets, setTweets] = useState([]);
  const postCollectionRef = collection(db, "tweets");

  useEffect(() => {
    const getPosts = async () => {
      const q = query(postCollectionRef, orderBy("date", "desc"));
      const data = await getDocs(q);
      const dataParsed = data.docs.map((doc) => ({
        ...doc.data(),
      }));

      setTweets(dataParsed);
      console.log(dataParsed);
    };

    getPosts();
  }, []);
  return (
    <section class="relative flex">
      <div class="min-h-screen bg-white md:w-3/4"></div>
      <div class="min-h-screen bg-blue-500 md:w-2/5"></div>

      <div class="flex flex-col justify-center w-full min-h-screen px-4 py-10 md:fixed md:mx-24">
        <h1 class="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">
          What our <span class="text-blue-500">customers</span> <br /> are
          saying
        </h1>

        <div class="grid w-full grid-cols-1 gap-8 mt-8 2xl:grid-cols-4 lg:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {tweets.map((tweet) => {
            return (
              <div class="w-full p-8 bg-white rounded-md shadow-lg">
                <p class="leading-loose text-gray-500 ">{tweet.message}</p>

                <div class="flex items-center mt-6 -mx-2">
                  <img
                    class="object-cover mx-2 rounded-full w-14 h-14"
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                    alt=""
                  />

                  <div class="mx-2">
                    <h1 class="font-semibold text-gray-800">{tweet.comment}</h1>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div class="items-center hidden mt-12 md:flex">
          <button
            title="left arrow"
            class="p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            title="right arrow"
            class="p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 lg:mx-6 hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

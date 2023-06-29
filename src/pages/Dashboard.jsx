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
    <section className="w-full min-h-screen relative flex justify-center items-center bg-cover bg-[url('https://images.unsplash.com/photo-1465060810938-30bbe7c40e76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2490&q=80')]">
      <div className="py-16">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="mb-20 space-y-4 px-6 md:px-0">
            <h2 className="text-center text-2xl font-bold text-white md:text-8xl">
              Arraiá da Firma!
            </h2>
          </div>
          <div className="md:columns-2 lg:columns-3 gap-8 space-y-8">
            {tweets.map((tweet) => {
              return (
                <div className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white shadow-2xl shadow-gray-600/10">
                  <div className="flex gap-4">
                    <img
                      className="w-12 h-12 rounded-full"
                      src="https://pbs.twimg.com/profile_images/1372441824560771075/DTcuXT0Z_400x400.jpg"
                      alt=""
                      width=""
                      height=""
                      loading="lazy"
                    />
                    <div>
                      <h6 className="text-lg font-medium text-gray-700">
                        Lucy
                      </h6>
                      <p className="text-sm text-gray-500">Mobile dev</p>
                    </div>
                  </div>
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonials-4-svg1.svg"
                    alt="commas"
                  />
                  <p className="mt-8">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Illum aliquid quo eum quae quos illo earum ipsa doloribus
                    nostrum minus libero aspernatur laborum cum, a suscipit,
                    ratione ea totam ullam! Lorem ipsum dolor sit amet
                    consectetur, adipisicing elit. Architecto laboriosam
                    deleniti aperiam ab veniam sint non cumque quis tempore
                    cupiditate. Sint libero voluptas veniam at reprehenderit,
                    veritatis harum et rerum.
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

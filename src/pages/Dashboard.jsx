import { useEffect, useState } from "react";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import { motion } from "framer-motion";

import { db } from "../firebase";

import Piloto from "../assets/piloto.png";
import Pilota from "../assets/pilota.png";
import Mago from "../assets/mago.png";
import LucyJunina from "../assets/lucy-junina.png";
import LucyFesteira from "../assets/lucy-festeira.png";
import Financeiro from "../assets/financeiro.png";
import Financeira from "../assets/financeira.png";
import TechMan from "../assets/tech-man.png";
import TechWoman from "../assets/tech-woman.png";

import ArraiaPlaca from "../assets/arraia-placa.png";

const people = [
  {
    id: 1,
    name: "Lucy Junina",
    avatar: LucyJunina,
  },
  {
    id: 2,
    name: "Lucy Arraiá",
    avatar: LucyFesteira,
  },
  {
    id: 3,
    name: "Piloto",
    avatar: Piloto,
  },
  {
    id: 4,
    name: "Pilota",
    avatar: Pilota,
  },
  {
    id: 5,
    name: "Mago",
    avatar: Mago,
  },
  {
    id: 6,
    name: "Sr. Financeiro",
    avatar: Financeiro,
  },
  {
    id: 7,
    name: "Sra. Financeira",
    avatar: Financeira,
  },
  {
    id: 8,
    name: "Sr. Tech",
    avatar: TechMan,
  },
  {
    id: 9,
    name: "Sra. Tech",
    avatar: TechWoman,
  },
];

const Dashboard = () => {
  const [tweets, setTweets] = useState([]);
  const postCollectionRef = collection(db, "tweets");

  const getAvatarImage = (avatarId) => {
    const data = people.find((element) => element.id === avatarId);
    return (
      <>
        <img
          className="w-24 h-24 rounded-full"
          src={data?.avatar}
          alt=""
          width=""
          height=""
          loading="lazy"
        />
        <div>
          <h6 className="text-xl sm:text-3xl font-medium text-gray-700">
            {data?.name}
          </h6>
        </div>
      </>
    );
  };

  useEffect(() => {
    const getPosts = async () => {
      const q = query(postCollectionRef, orderBy("date", "desc"));
      const data = await getDocs(q);
      const dataParsed = data.docs.map((doc) => ({
        ...doc.data(),
      }));

      setTweets(dataParsed);
    };

    const intervalId = setInterval(getPosts, 5000);
    return () => {
      clearInterval(intervalId);
    };

    // getPosts();
  }, []);

  return (
    <section className="w-full min-h-screen py-4 sm:py-10 relative flex justify-center items-center bg-cover bg-fixed bg-[url('/img/dashboard-bg.png')]">
      <div className="sm:container px-6 text-gray-600 md:px-12 xl:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            transition: {
              type: "spring",
              delay: 0.2,
            },
          }}
          className="flex justify-center items-center mb-8"
        >
          <img
            src={ArraiaPlaca}
            alt=""
            width="300"
            height="300"
            loading="lazy"
          />
        </motion.div>
        <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3">
          {tweets.map((tweet) => {
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    type: "tween",
                  },
                }}
                key={tweet.id}
                className="h-full p-8 border border-gray-100 rounded-3xl bg-white shadow-2xl shadow-gray-600/10"
              >
                <div className="flex items-center mb-4 gap-4">
                  {getAvatarImage(tweet.avatar)}
                </div>
                <div className="flex space-x-4">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonials-4-svg1.svg"
                    alt="commas"
                  />
                  <h2 className="text-xl sm:text-3xl text-bold text-gray-950 mt-4">
                    {tweet.message}
                  </h2>
                </div>
                <p className="mt-8 italic sm:text-xl text-gray-500">
                  Comentário da Lucy:
                </p>
                <p className="mt-2 italic sm:text-xl">
                  &quot;{tweet.comment}&quot;
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

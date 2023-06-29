import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { CircularProgress } from "@material-ui/core";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

import MenuList from "../components/MenuList";

const Form = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  let date = new Date();
  const postCollectionRef = collection(db, "tweets");
  const { width, height } = useWindowSize();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const url = "http://204.48.19.221:3000/api/text/GPT3_5ThreeTries";
    const payload = {
      prompt:
        "Seu nome agora é Lucy. Você é uma mente mestra em comentar frases de uma forma que as pessoas se engajem e se divirtam. Você como mente mestra deve ler as frases que serão enviadas e fazer um comentário bem estruturado e que seja divertido de até 200 caracteres. Utilize piadas, curiosidades e responda sempre para o usuário que enviou o comentário. Procure não repetir nada da frase que o usuário enviou. Você deve utilizar elementos ligados a festa junina, turismo e tecnologia. Lucy, responda agora o comentário",
      temperature: 1,
      message: message,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "success") {
        const fullMessageData = {
          id: uuidv4(),
          date,
          message: payload.message,
          comment: data.data,
        };

        await addDoc(postCollectionRef, fullMessageData);

        setCelebrate(true);

        setTimeout(() => {
          setCelebrate(false);
        }, 5000);

        setMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      {celebrate && <Confetti width={width} height={height} />}
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      ></div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Correio Elegante
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Aute magna irure deserunt veniam aliqua magna enim voluptate.
        </p>
      </div>
      <form
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <MenuList />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Mensagem
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Manda pra nóis"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;

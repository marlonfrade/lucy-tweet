import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress } from "@mui/material";

import MenuList from "../components/MenuList";

import Piloto from "../assets/piloto.png";
import Pilota from "../assets/pilota.png";
import Mago from "../assets/mago.png";
import LucyJunina from "../assets/lucy-junina.png";
import LucyFesteira from "../assets/lucy-festeira.png";
import Financeiro from "../assets/financeiro.png";
import Financeira from "../assets/financeira.png";
import TechMan from "../assets/tech-man.png";
import TechWoman from "../assets/tech-woman.png";

const modalOptions = ["Sim", "Não"];

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
    name: "Comissário de Bordo",
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

const Form = () => {
  const [selected, setSelected] = useState(people[0]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalForm, setModalForm] = useState({
    firstQuestion: "",
    secondQuestion: "",
  });
  const [modalError, setModalError] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const isFormAnswered = localStorage.getItem("is_form_answered") || false;

  let date = new Date();
  const tweetsCollectionRef = collection(db, "tweets");
  const formCollectionRef = collection(db, "questions");
  const { width, height } = useWindowSize();

  const handleAgree = async () => {
    console.log(modalForm);

    if (!modalForm.firstQuestion.length || !modalForm.secondQuestion.length) {
      setModalError(true);
    } else {
      setModalError(false);
      setModalLoading(true);
      try {
        const formData = {
          isUserSatisfied: modalForm.firstQuestion,
          suggestion: modalForm.secondQuestion,
        };
        await addDoc(formCollectionRef, formData);
        localStorage.setItem("is_form_answered", true);
        setOpenModal(false);
        setModalForm({
          firstQuestion: "",
          secondQuestion: "",
        });
      } catch (error) {
        console.log(error);
      } finally {
        setModalForm({
          firstQuestion: "",
          secondQuestion: "",
        });
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!message.length) {
      alert("Insira uma mensagem");
      return;
    }
    const avatarId = selected.id;
    setLoading(true);

    const url =
      "https://lucy-adm.monkeybranch.com.br/api/text/GPT3_5ThreeTries";
    const payload = {
      prompt:
        "Seu nome agora é Lucy. Você é uma mente mestra em comentar frases de uma forma que as pessoas se engajem e se divirtam. Você como mente mestra deve ler as frases que serão enviadas e fazer um comentário bem estruturado e que seja divertido de até 120 caracteres. Utilize piadas, curiosidades e responda sempre para o usuário que enviou o comentário. Procure não repetir nada da frase que o usuário enviou. Você deve utilizar elementos ligados a festa junina, turismo e tecnologia. Lucy, responda agora o comentário",
      temperature: 0.3,
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
          avatar: avatarId,
        };

        await addDoc(tweetsCollectionRef, fullMessageData);

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

  useEffect(() => {
    if (!isFormAnswered) {
      setOpenModal(true);
    }
  }, []);

  return (
    <div className="isolate min-h-screen bg-white px-6 py-24 sm:py-32 lg:px-8">
      {celebrate && <Confetti width={width} height={height} />}
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem] backdrop-blur-lg"
        aria-hidden="true"
      ></div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Correio Elegante Digital
        </h2>
        <p className="mt-2 text-md leading-8 text-gray-600">
          Compartilhe suas ideias e opiniões sobre o trabalho em equipe de
          maneira criativa!
        </p>
      </div>
      <form
        action="#"
        method="POST"
        className="mx-auto mt-10 max-w-xl sm:mt-20"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <MenuList
              people={people}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Digite sua mensagem
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 rounded-full animate-pulse bg-green-500"></div>
                <div className="w-4 h-4 rounded-full animate-pulse bg-green-500"></div>
                <div className="w-4 h-4 rounded-full animate-pulse bg-green-500"></div>
              </div>
            ) : (
              <button
                type="submit"
                className="block w-full rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                disabled={loading}
              >
                MANDA PRA NÓS SÔ
              </button>
            )}
          </div>
        </div>
      </form>
      <Dialog open={openModal}>
        <DialogTitle>Formulário</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para utilizar nosso correio elegante digital, você só precisa
            responder essas duas perguntas rápidas:
          </DialogContentText>
          <Typography variant="subtitle1" gutterBottom mt={2}>
            Você se sente valorizado pela empresa e por seus líderes?
          </Typography>
          <TextField
            error={modalError}
            select
            label="Selecione"
            fullWidth
            defaultValue=""
            onChange={(e) => {
              setModalForm({ ...modalForm, firstQuestion: e.target.value });
            }}
          >
            {modalOptions.map((option, id) => (
              <MenuItem key={id} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Typography variant="subtitle1" gutterBottom mt={2}>
            Sugira ações e/ou medidas que possam colaborar para o clima
            organizacional do escritório.
          </Typography>
          <TextField
            error={modalError}
            label="O que você sugere?"
            multiline
            fullWidth
            outline="none"
            maxRows={10}
            variant="outlined"
            helperText="* Este é um espaço seguro e as mensagens/respostas são anônimas"
            value={modalForm.secondQuestion}
            onChange={(e) =>
              setModalForm({ ...modalForm, secondQuestion: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          {modalLoading ? (
            <CircularProgress size={20} />
          ) : (
            <Button onClick={handleAgree}>Enviar</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Form;

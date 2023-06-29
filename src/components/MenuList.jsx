import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import Piloto from "../assets/piloto.png";
import Pilota from "../assets/pilota.png";
import Mago from "../assets/mago.png";
import LucyJunina from "../assets/lucy-junina.png";
import LucyFesteira from "../assets/lucy-festeira.png";
import Financeiro from "../assets/financeiro.png";
import Financeira from "../assets/financeira.png";
import TechMan from "../assets/tech-man.png";
import TechWoman from "../assets/tech-woman.png";

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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MenuList = () => {
  const [selected, setSelected] = useState(people[3]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
            Escolha seu personagem
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <img
                  src={selected.avatar}
                  alt=""
                  className="h-5 w-5 flex-shrink-0 rounded-full"
                />
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {people.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img
                            src={person.avatar}
                            alt=""
                            className="h-5 w-5 flex-shrink-0 rounded-full"
                          />
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {person.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default MenuList;

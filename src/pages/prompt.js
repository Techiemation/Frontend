import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import whiteLogo from "../resourses/Logo/whiteLogo3.png";
import { CgCloseO } from "react-icons/cg";
import { IoChevronBack } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import { Link } from "react-router-dom";

import PromptBox from "../components/PromptBox";
import Logo from "../components/Logo";

export default function Prompt() {
  const initialHistoryList = [
    {
      id: "f0e1c940-d001-47fe-914f-012846b8a8c3",
      dateTime: "29/01/2024",
      title: "React Hooks",
      method: "Text",
      prompt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      result:
        "Pellentesque elit eget gravida cum. Malesuada fames ac turpis egestas integer eget aliquet nibh. Commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Orci ac auctor augue mauris augue neque gravida. Dignissim convallis aenean et tortor at risus viverra adipiscing at. Urna duis convallis convallis tellus id",
    },
    {
      id: "6182cc95-908c-4f78-8280-475181e1eb2e",
      dateTime: "29/01/2024",
      title: "Javascript Function",
      method: "Link",
      prompt:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
      result:
        "Pellentesque elit eget gravida cum. Malesuada fames ac turpis egestas integer eget aliquet nibh. Commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Orci ac auctor augue mauris augue neque gravida. Dignissim convallis aenean et tortor at risus viverra adipiscing at. Urna duis convallis convallis tellus id",
    },
    {
      id: "c5149ee9-8f0b-498d-989e-bab3fbe673ee",
      dateTime: "29/01/2024",
      title: "Python Loops",
      method: "Text",
      prompt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      result:
        "Pellentesque elit eget gravida cum. Malesuada fames ac turpis egestas integer eget aliquet nibh. Commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Orci ac auctor augue mauris augue neque gravida. Dignissim convallis aenean et tortor at risus viverra adipiscing at. Urna duis convallis convallis tellus id",
    },
  ];

  const [userPrompt, setUserPrompt] = useState("");
  const [translatedPrompt, setTranslatedPrompt] = useState("");
  const [language, setLanguage] = useState("en");
  const [historyList, setHistoryList] = useState(initialHistoryList);
  const [current, setCurrent] = useState(null);

  // function handleChangeMethod(input) {
  //   setMethod(input === method ? method : input);
  // }

  function handleLanguageChange(lang) {
    if (language === lang) return;
    setLanguage(lang);
  }

  const handleOnUpdate = (id, newPrompt, newResult) => {
    setHistoryList(
      historyList.map((history) =>
        history.id === id
          ? { ...history, prompt: newPrompt, result: newResult }
          : history
      )
    );
    console.log(historyList);
  };

  function handleOnDelete(e) {
    setHistoryList(historyList.filter((el) => el !== e));
  }

  function handleOnAdd(e, history) {
    e.preventDefault();
    setHistoryList(() => [...historyList, history]);
    setCurrent(history.id);
  }

  function handleOnOpen(history) {
    // e.preventDefault();
    setUserPrompt(history.prompt);
    setTranslatedPrompt(history.result);
    handleCurrentChange(history.id);
  }

  function handleCurrentChange(newCurrent) {
    setCurrent(newCurrent);
  }

  const [sideBar, setSideBar] = useState(true);
  const historyBar = sideBar ? "" : "history-hide";

  return (
    <div className="prompt">
      <div className={`history ${historyBar}`}>
        <div className="icon-bar">
          <IoChevronBack
            className="sidebar-close"
            onClick={() => setSideBar(!sideBar)}
          />
        </div>
        <h1 className="history-heading">history</h1>
        <div className="history-boxes">
          {historyList.map((history) => (
            <History
              history={history}
              onDelete={handleOnDelete}
              onOpen={handleOnOpen}
              key={history.id}
            />
          ))}
        </div>
      </div>
      <div className="prompt-container">
        <IoChevronForward
          className="sidebar-open"
          onClick={() => setSideBar(!sideBar)}
        />
        <div className="nav-section">
          <Logo logo={whiteLogo} />

          <div className="profile">
            <Link to={"/userProfile"}>B</Link>
          </div>
        </div>
        <PromptBox
          userPrompt={userPrompt}
          setUserPrompt={setUserPrompt}
          translatedPrompt={translatedPrompt}
          setTranslatedPrompt={setTranslatedPrompt}
          current={current}
          onCurrentChange={handleCurrentChange}
          onUpdate={handleOnUpdate}
          language={language}
          selectLanguage={handleLanguageChange}
          onAdd={handleOnAdd}
        />
      </div>
    </div>
  );
}

function History({ history, onDelete, onOpen }) {
  return (
    <div className="history-item" onClick={() => onOpen(history)}>
      <p>{history.title}</p>
      <CgCloseO
        onClick={() => {
          onDelete(history);
        }}
      />
    </div>
  );
}

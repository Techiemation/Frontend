import { useState } from "react";
import whiteLogo from "../resourses/Logo/whiteLogo3.png";
import { CgCloseO } from "react-icons/cg";
import { BiSolidArrowToLeft, BiSolidArrowFromLeft } from "react-icons/bi";

import PromptBox from "../components/PromptBox";
import Logo from "../components/Logo";

export default function Prompt() {
  const initialHistoryList = [
    {
      dateTime: "29/01/2024",
      title: "React Hooks",
      method: "Text",
      prompt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      result:
        "Pellentesque elit eget gravida cum. Malesuada fames ac turpis egestas integer eget aliquet nibh. Commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Orci ac auctor augue mauris augue neque gravida. Dignissim convallis aenean et tortor at risus viverra adipiscing at. Urna duis convallis convallis tellus id",
    },
    {
      dateTime: "29/01/2024",
      title: "Javascript Function",
      method: "Link",
      prompt:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
      result:
        "Pellentesque elit eget gravida cum. Malesuada fames ac turpis egestas integer eget aliquet nibh. Commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Orci ac auctor augue mauris augue neque gravida. Dignissim convallis aenean et tortor at risus viverra adipiscing at. Urna duis convallis convallis tellus id",
    },
    {
      dateTime: "29/01/2024",
      title: "Python Loops",
      method: "Text",
      prompt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      result:
        "Pellentesque elit eget gravida cum. Malesuada fames ac turpis egestas integer eget aliquet nibh. Commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Orci ac auctor augue mauris augue neque gravida. Dignissim convallis aenean et tortor at risus viverra adipiscing at. Urna duis convallis convallis tellus id",
    },
  ];

  const [method, setMethod] = useState("Text");
  const [language, setLanguage] = useState("en");
  const [historyList, setHistoryList] = useState(initialHistoryList);

  function handleChangeMethod(input) {
    setMethod(input === method ? method : input);
  }

  function handleLanguageChange(lang) {
    if (language === lang) return;
    setLanguage(lang);
  }

  function handleOnDelete(e) {
    setHistoryList(historyList.filter((el) => el !== e));
  }

  function handleOnAdd(e, history) {
    e.preventDefault();
    // console.log(history);
    setHistoryList(() => [...historyList, history]);
  }

  const [sideBar, setSideBar] = useState(true);
  const historyBar = sideBar ? "" : "history-hide";

  return (
    <div className="prompt">
      <div className={`history ${historyBar}`}>
        <div className="icon-bar">
          <BiSolidArrowToLeft
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
              key={history.dateTime + history.title}
            />
          ))}
        </div>
      </div>
      <div className="prompt-container">
        <BiSolidArrowFromLeft
          className="sidebar-open"
          onClick={() => setSideBar(!sideBar)}
        />
        <div className="nav-section">
          <Logo logo={whiteLogo} />

          <div className="profile">
            <p>B</p>
          </div>
        </div>

        <PromptBox
          language={language}
          selectLanguage={handleLanguageChange}
          onAdd={handleOnAdd}
        />
      </div>
    </div>
  );
}

function History({ history, onDelete }) {
  return (
    <div className="history-item">
      <p>{history.title}</p>
      <CgCloseO
        onClick={() => {
          onDelete(history);
        }}
      />
    </div>
  );
}

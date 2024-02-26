import { useState } from "react";
// import whiteLogo from "../resourses/Logo/whiteLogo.png";
import { CgCloseO } from "react-icons/cg";
import ActionBtn from "../components/ActionBtn";

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
  const [language, setLanguage] = useState(1);
  const [historyList, setHistoryList] = useState(initialHistoryList);

  function handleChangeMethod(e) {
    // console.log(e.target.innerText);
    setMethod(e.target.innerText === method ? method : e.target.innerText);
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
    console.log(history);
    setHistoryList(() => [...historyList, history]);
  }

  return (
    <div className="prompt">
      <div className="history">
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
        <div className="nav-section">
          <Logo />
          <div className="diff-btn">
            <div
              onClick={(e) => handleChangeMethod(e)}
              className={`btn ${method === "Text" && "active"}`}
            >
              Text
            </div>
            <div
              onClick={(e) => handleChangeMethod(e)}
              className={`btn ${method === "Link" && "active"}`}
            >
              Link
            </div>
          </div>
          <div className="profile">
            <p>B</p>
          </div>
        </div>
        {method === "Text" ? (
          <TextPrompt
            language={language}
            selectLanguage={handleLanguageChange}
            onAdd={handleOnAdd}
          />
        ) : (
          <LinkPrompt
            language={language}
            selectLanguage={handleLanguageChange}
            onAdd={handleOnAdd}
          />
        )}
      </div>
    </div>
  );
}

function LinkPrompt({ language, selectLanguage, onAdd }) {
  return (
    <div className="prompt-link">
      <select
        className="language-selector"
        value={language}
        onChange={(e) => selectLanguage(e.target.value)}
      >
        <option value={1}>English</option>
        <option value={2}>Urdu</option>
        <option value={3}>Sindhi</option>
      </select>
      <textarea className="link-result" placeholder="Summarization result" />
      <input className="link" placeholder="https://www.google.com/" />
      <ActionBtn btn={"btn-white prompt-link-btn"}>Search</ActionBtn>
    </div>
  );
}

function TextPrompt({ language, selectLanguage, onAdd }) {
  const [userPrompt, setUserPrompt] = useState("");
  const [summarizedPrompt, setSummarizedPrompt] = useState("");

  function getHistory() {
    return {
      dateTime: Date(),
      title: userPrompt.split(" ").splice(0, 2).join(" "),
      method: "Text",
      prompt: userPrompt,
      result: summarizedPrompt,
    };
  }
  return (
    <div className="prompt-text">
      <form className="text-prompt">
        <textarea
          placeholder="Enter Text For Summarization"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
        />
        <ActionBtn btn="btn-white prompt-text-btn">Summarize</ActionBtn>
      </form>

      <form className="text-prompt">
        <select
          className="language-selector"
          value={language}
          onChange={(e) => selectLanguage(e.target.value)}
        >
          <option value={1}>English</option>
          <option value={2}>Urdu</option>
          <option value={3}>Sindhi</option>
        </select>
        <textarea
          placeholder="Your Text's Summarization"
          value={summarizedPrompt}
          onChange={(e) => setSummarizedPrompt(e.target.value)}
        />
        <ActionBtn
          btn="btn-white prompt-text-btn"
          onClick={(e) => onAdd(e, getHistory())}
        >
          Translate
        </ActionBtn>
      </form>
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

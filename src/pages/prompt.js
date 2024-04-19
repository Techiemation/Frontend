import { useState } from "react";
import axios from "axios";
import whiteLogo from "../resourses/Logo/whiteLogo3.png";
import { CgCloseO } from "react-icons/cg";
import { MdOutlineSummarize } from "react-icons/md";
import { MdOutlineTranslate } from "react-icons/md";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { BiSolidArrowToLeft, BiSolidArrowFromLeft } from "react-icons/bi";
import { PiTextTBold } from "react-icons/pi";
// import { PiTextT } from "react-icons/pi";
// import { MdLink } from "react-icons/md";
import { IoLinkSharp } from "react-icons/io5";
// import { FaLink } from "react-icons/fa";

import ActionBtn from "../components/ActionBtn";

import Logo from "../components/Logo";
import { render } from "@testing-library/react";

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
    console.log(history);
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
          <div className="diff-btn">
            <div
              onClick={(e) => handleChangeMethod("Text")}
              className={`btn ${method === "Text" && "active"}`}
            >
              {/* <PiTextTBold /> */}
              {/* <PiTextT /> */}
              <PiTextTBold className="icon" />
              <span className="btn-text">Text</span>
            </div>
            <div
              onClick={(e) => handleChangeMethod("Link")}
              className={`btn ${method === "Link" && "active"}`}
            >
              {/* <IoLinkSharp />
              Link */}
              <IoLinkSharp className="icon" />
              <span className="btn-text">Link</span>
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
  function renderResult(content) {
    if (!content) return "";
    return Object.entries(content)
      .map(([heading, text]) => `${heading}\n${text}\n`)
      .join("\n");
  }

  const [link, setLink] = useState("");
  const [result, setResult] = useState("");

  const fetchData = () => {
    // Make sure the link is not empty before proceeding
    if (link.trim() === "") {
      alert("Please enter a valid link.");
      return;
    }

    // Make a GET request to your Flask backend to fetch data from the link
    axios
      .get(`http://127.0.0.1:5000/api/scrape?url=${encodeURIComponent(link)}`)
      .then((response) => {
        // Update the result state with the fetched data
        // console.log(response.data);
        setResult(renderResult(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("An error occurred while fetching data.");
      });
  };

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
      <textarea
        className="link-result"
        value={result}
        onChange={(e) => setResult(e.target.value)}
        placeholder="Summarization result"
        readOnly
      />
      <input
        className="link"
        placeholder="https://www.google.com/"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <ActionBtn btn={"btn-white prompt-link-btn"} onClick={fetchData}>
        <MdOutlineContentPasteSearch /> <span className="btn-text">Search</span>
      </ActionBtn>
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
        <ActionBtn btn="btn-white prompt-text-btn">
          <MdOutlineSummarize />
          Summarize
        </ActionBtn>
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
          link="https://techiemationtranslator.azurewebsites.net/"
        >
          <MdOutlineTranslate /> Translate
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

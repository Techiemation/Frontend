import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { MdOutlineSummarize } from "react-icons/md";
import { MdOutlineTranslate } from "react-icons/md";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import ActionBtn from "../components/ActionBtn";

export default function PromptBox({
  language,
  selectLanguage,
  onAdd,
  onUpdate,
  userPrompt,
  setUserPrompt,
  current,
  translatedPrompt,
  setTranslatedPrompt,
  link,
  setLink,
}) {
  let summarizedPrompt;

  function getHistory() {
    // console.log(summarizedPrompt);
    return {
      id: uuidv4(),
      dateTime: new Date().toString(),
      title: summarizedPrompt
        ? summarizedPrompt.split(" ").splice(0, 2).join(" ")
        : "User Prompt",
      prompt: userPrompt,
      result: summarizedPrompt,
    };
  }

  function summarizeText(e) {
    axios
      .post("http://127.0.0.1:5000/summarize", {
        text: userPrompt,
      })
      .then((response) => {
        console.log(response.data);
        summarizedPrompt = response.data["summarized_text"];
        setTranslatedPrompt(summarizedPrompt);
        console.log(current);
        if (current === null) {
          onAdd(e, getHistory());
        } else {
          onUpdate(current, userPrompt, summarizedPrompt);
        }
        console.log(current);
      })
      .catch((error) => {
        console.error("Error Summarizing Text:", error);
      });
  }

  const translateText = () => {
    axios
      .post("http://127.0.0.1:5000/translator", {
        language: language,
        text: translatedPrompt || userPrompt,
      })
      .then((response) => {
        console.log(response.data);
        setTranslatedPrompt(response.data["translated_text"]);
      })
      .catch((error) => {
        console.error("Error Translating Text:", error);
      });
  };

  function handleOnSummarize(e) {
    console.log("Summarize function triggered");
    if (userPrompt === "") {
      alert("Error! Please Enter Text to Summarize.");
      return;
    } else {
      summarizeText(e);
    }
  }

  function handleOnTranslate() {
    console.log("Translate function triggered");
    if (userPrompt === "") {
      alert("Error! Please Enter Text to Translated.");
      return;
    } else {
      translateText();
    }
  }

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
        console.log(response.data);
        setUserPrompt(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("An error occurred while fetching data.");
      });
  };

  return (
    <div className="prompt-text">
      <form className="text-prompt">
        <textarea
          name="text-input"
          placeholder="Enter Text For Summarization"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
        />
        <ActionBtn btn="btn-white prompt-text-btn" onClick={handleOnSummarize}>
          <MdOutlineSummarize />
          Summarize
        </ActionBtn>
      </form>

      <form className="text-prompt">
        <select
          name="language-input"
          className="language-selector"
          value={language}
          onChange={(e) => selectLanguage(e.target.value)}
        >
          <option value={"en"}>English</option>
          <option value={"ur"}>Urdu</option>
          <option value={"sd"}>Sindhi</option>
        </select>
        <textarea
          name="text-output"
          placeholder="Your Text's Summarization"
          value={translatedPrompt}
          readOnly
        />
        <ActionBtn btn="btn-white prompt-text-btn" onClick={handleOnTranslate}>
          <MdOutlineTranslate /> Translate
        </ActionBtn>
      </form>
      <form className="search-box">
        <input
          className="search-box-input"
          placeholder="https://developer.mozilla.org/"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <ActionBtn btn={"prompt-search-btn"} onClick={fetchData}>
          <MdOutlineContentPasteSearch />{" "}
          <span className="btn-text">Fetch</span>
        </ActionBtn>
      </form>
    </div>
  );
}

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
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

  // const [userData, setUserData] = useState(null);

  function handleOnPromptUpdate() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const updatedData = {
        prompt: userPrompt,
        history: summarizedPrompt,
      };
      updateDoc(docRef, updatedData)
        .then(() => {
          console.log("Profile updated successfully");
        })
        .catch((error) => {
          console.log("Error updating profile:", error);
          // alert("Error updating profile: " + error.message);
        });
    }
  }

  function summarizeText(e) {
    axios
      .post("https://techiemation-backend.azurewebsites.net/summarize", {
        text: userPrompt,
      })
      .then((response) => {
        console.log(response.data);
        summarizedPrompt = response.data["summarized_text"];
        setTranslatedPrompt(summarizedPrompt);

        if (current === null) {
          onAdd(e, getHistory());
        } else {
          onUpdate(current, userPrompt, summarizedPrompt);
        }
        handleOnPromptUpdate();
      })
      .catch((error) => {
        console.error("Error Summarizing Text:", error);
      });
  }

  const translateText = () => {
    axios
      .post("https://techiemation-backend.azurewebsites.net/translator", {
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
      .get(
        `https://techiemation-backend.azurewebsites.net/api/scrape?url=${encodeURIComponent(
          link
        )}`
      )
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
      <form name="input-box" className="text-prompt">
        <textarea
          name="user-input"
          placeholder="Enter Text For Summarization"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
        />
        <ActionBtn btn="btn-white prompt-text-btn" onClick={handleOnSummarize}>
          <MdOutlineSummarize />
          Summarize
        </ActionBtn>
      </form>

      <form name="result-box" className="text-prompt">
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
      <form name="link-form" className="search-box">
        <input
          name="link-box"
          className="search-box-input"
          type="url"
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

import { useEffect, useState, useContext } from "react";
import whiteLogo from "../resourses/Logo/whiteLogo3.png";
import { CgCloseO } from "react-icons/cg";
import { IoChevronBack } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

import { db } from "../firebase";
import PromptBox from "../components/PromptBox";
import Logo from "../components/Logo";
import { UserContext } from "../UserContext";

export default function Prompt() {
  const { user } = useContext(UserContext);
  const [userPrompt, setUserPrompt] = useState("");
  const [translatedPrompt, setTranslatedPrompt] = useState("");
  const [language, setLanguage] = useState("en");
  const [historyList, setHistoryList] = useState([]);
  const [current, setCurrent] = useState(null);
  const [link, setLink] = useState("");
  const [sideBar, setSideBar] = useState(true);
  const historyBar = sideBar ? "" : "history-hide";

  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          console.log("User is signed in : " + user.uid);
          const docRef = doc(db, "users", user.uid);
          try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const data = docSnap.data();

              const obj = {
                id: uuidv4(),
                dateTime: new Date().toString(),
                title: data.history
                  ? data.history.split(" ").splice(0, 2).join(" ")
                  : "User Prompt",
                prompt: data.prompt,
                result: data.history,
              };
              if (!data.prompt) return;
              setHistoryList([obj]);
            } else {
              console.log("No such document!");
            }
          } catch (error) {
            console.error("Error fetching document: ", error);
          }
        } else {
          console.log("No user is signed in");
        }
      });
    };

    fetchData();
    console.log("user is ", user);
  }, [user]);

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
  };

  function handleOnEmptyHistory() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const updatedData = {
        prompt: "",
        history: "",
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

  function handleOnDelete(e) {
    if (e.id === current) handleNewPrompt();
    setHistoryList(historyList.filter((el) => el !== e));
    if (historyList.length <= 1) {
      handleOnEmptyHistory();
    }
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

  function handleNewPrompt() {
    setCurrent(null);
    setUserPrompt("");
    setTranslatedPrompt("");
    setLink("");
  }

  return (
    <div className="prompt">
      <div className={`history ${historyBar}`}>
        <div className="icon-bar">
          <IoChevronBack
            className="sidebar-close"
            onClick={() => setSideBar(!sideBar)}
          />
          <LuPlus className="sidebar-close" onClick={() => handleNewPrompt()} />
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
        <LuPlus
          className="sidebar-open sidebar-open-new"
          onClick={() => handleNewPrompt()}
        />

        <div className="nav-section">
          <Logo logo={whiteLogo} />

          <Link className="profile" to={"/userProfile"}>
            {user ? <p>{user[0]}</p> : <div className="loading-dot">.</div>}
          </Link>
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
          link={link}
          setLink={setLink}
        />
      </div>
    </div>
  );
}

function History({ history, onDelete, onOpen }) {
  return (
    <div className="history-item">
      <p onClick={() => onOpen(history)}>{history.title}</p>
      <CgCloseO
        className="history-item-close"
        onClick={() => {
          onDelete(history);
        }}
      />
    </div>
  );
}

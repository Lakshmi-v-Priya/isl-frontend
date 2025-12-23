import { useEffect, useState } from "react";
import { connectWebSocket } from "../services/websocket";

import Camera from "../components/Camera";
import TextBox from "../components/TextBox";
import ErrorAlert from "../components/ErrorAlert";
import WordPrediction from "../components/WordPrediction";
import LanguageSelector from "../components/LanguageSelector";
import ControlButtons from "../components/ControlButtons";

function Home() {
  const [language, setLanguage] = useState("English");
  const [audioUrl, setAudioUrl] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    connectWebSocket((data) => {
  if (data.sentence) {
    setText(data.sentence);
    setPredictions(data.predictions || []);
  }

  if (data.audio) {
    setAudioUrl(`http://127.0.0.1:8000/${data.audio}`);
  }
});

  }, []);

  const handlePredictionClick = (word) => {
    setText((prev) => prev + " " + word);
  };

  const handleClear = () => {
  setText("");
  setPredictions([]);
  setAudioUrl("");
};


  return (
  <div className="container">
    <h1>Real-Time ISL to Text & Speech</h1>

    <Camera language={language} />
    <ErrorAlert error={error} />
    <TextBox text={text} />

    {audioUrl && (
      <audio src={audioUrl} controls autoPlay />
    )}

    <WordPrediction
      predictions={predictions}
      onSelect={handlePredictionClick}
    />

    <LanguageSelector
      language={language}
      setLanguage={setLanguage}
    />

    <ControlButtons onClear={handleClear} />
  </div>
);

}

export default Home;

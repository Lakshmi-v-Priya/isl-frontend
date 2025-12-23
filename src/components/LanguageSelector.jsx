function LanguageSelector({ language, setLanguage }) {
  return (
    <div>
      <h4>Select Speech Language</h4>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option>English</option>
        <option>Tamil</option>
        <option>Hindi</option>
        <option>Telugu</option>
      </select>
    </div>
  );
}

export default LanguageSelector;

function TextBox({ text }) {
  return (
    <div>
      <h3>Recognized Text</h3>
      <textarea
        rows="4"
        cols="60"
        value={text}
        readOnly
      />
    </div>
  );
}

export default TextBox;

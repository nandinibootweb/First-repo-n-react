import { useState, useEffect } from "react";
import Modal from "react-modal";
import moment from "moment";
import "./App.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    color: "black",
  },
};

function App() {
  const [addEntryModalIsOpen, setAddEntryModalIsOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [cardModalIsOpen, setCardModalIsOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState({});
  const [entries, setEntries] = useState(
    JSON.parse(localStorage.getItem("entries")) ?? []
  );

  // const [entries, setEntries] = useState([
  //   {
  //     title: "title 24",
  //     date: moment(
  //       "Wed Jun 24 2024 23:09:40 GMT+0200 (Central European Summer Time)"
  //     ).format("L"),
  //     imageUrl: "",
  //     content: "Some fancy content 24",
  //   },
  //   {
  //     title: "title 25",
  //     date: moment(
  //       "Wed Jun 25 2024 23:09:40 GMT+0200 (Central European Summer Time)"
  //     ).format("L"),
  //     imageUrl: "",
  //     content: "Some fancy content 25",
  //   },
  // ]);

  const handleCardClick = (entryDate) => {
    return () => {
      setCardModalIsOpen(true);
      setSelectedEntry(entries.find((e) => e.date === entryDate));
    };
  };

  const closeModal = () => {
    setCardModalIsOpen(false);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleAddEntryButtonClick = () => {
    // 1. Show modal, if no entry found for today
    const entryForToday = entries.find((e) => e.date === moment().format("L"));
    if (!!entryForToday) {
      return;
    }

    setAddEntryModalIsOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 2. Validate all form elements
    // 3. Enable submit if everything is okay
    // 4. When Submit is clicked
    // 5. Add entry to storage
    const entriesCopy = entries.slice();
    // entriesCopy.push({
    //   title: "title 26",
    //   date: "Wed Jun 26 2024 23:09:40 GMT+0200 (Central European Summer Time)",
    //   imageUrl: "",
    //   content: "Some fancy content 26",
    // });
    entriesCopy.push({
      title,
      date: moment().format("L"),
      imageUrl,
      content,
    });
    localStorage.setItem("entries", JSON.stringify(entriesCopy));
    setEntries(entriesCopy);
    setAddEntryModalIsOpen(false);
    setTitle("");
    setContent("");
    setImageUrl("");
  };

  return (
    <>
      <header>
        <nav className="bg-orange-600">
          <div>Homepage</div>
        </nav>
      </header>

      <div>
        <button className=" bg-orange-950" onClick={handleAddEntryButtonClick}>
          Add Entry
        </button>
      </div>
      <div>
        {entries.map((entry) => (
          <div key={entry.date} onClick={handleCardClick(entry.date)}>
            <img href={entry.imageUrl} />
            <h2>{entry.title}</h2>
            <h4>{entry.date}</h4>
          </div>
        ))}
      </div>

      <Modal isOpen={addEntryModalIsOpen} style={customStyles}>
        <h2>Make an entry</h2>
        <form onSubmit={handleSubmit}>
          <label> Title </label>
          <br />
          <input
            name="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
          <br />
          <label> Image Link </label>
          <br />
          <input
            name="imageUrl"
            type="text"
            value={imageUrl}
            onChange={handleImageUrlChange}
          />
          <br />
          <label> Content </label>
          <br />
          <textarea
            name="content"
            value={content}
            onChange={handleContentChange}
          ></textarea>
          <br />
          <input type="submit" value="save" />
        </form>
      </Modal>

      <Modal isOpen={cardModalIsOpen} style={customStyles}>
        <div key={selectedEntry.date}>
          <img href={selectedEntry.imageUrl} />
          <h2>{selectedEntry.title}</h2>
          <h4>{selectedEntry.date}</h4>
          <p>{selectedEntry.content}</p>
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </>
  );
}

export default App;

import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = () => {
    const data = {
      title: title,
      author: author,
      publishYear: publishYear,
    };

    setLoading(true);

    axios
      .post("http://localhost:5555/books", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data);
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="w-[600px]">
        <label className="w-full block">Book title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 border-gray-500 p-1 w-full"
        />
        <label className="w-full block">Book author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border-2 border-gray-500 p-1 w-full"
        />
        <label className="w-full block">Book publish </label>
        <input
          type="text"
          value={publishYear}
          onChange={(e) => setPublishYear(e.target.value)}
          className="border-2 border-gray-500 p-1 w-full"
        />

        <button className="p-2 bg-sky-300 my-8" onClick={handleSaveBook}>
          Save new book
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;

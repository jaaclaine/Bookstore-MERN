import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setTitle(response.data.title);
        setPublishYear(response.data.publishYear);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleEditBook = () => {
    const data = {
      title: title,
      author: author,
      publishYear: publishYear,
    };

    setLoading(true);

    axios
      .put(`http://localhost:5555/books/${id}`, data, {
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
      <h1 className="text-3xl my-4">Edit Book</h1>
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

        <button className="p-2 bg-sky-300 my-8" onClick={handleEditBook}>
          Edit book
        </button>
      </div>
    </div>
  );
};

export default EditBooks;

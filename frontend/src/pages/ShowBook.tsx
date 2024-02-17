import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ShowBook = () => {
  const [book, setBook] = useState<{
    title: string;
    _id: number;
    author: string;
  }>({
    title: "",
    _id: 0,
    author: "",
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="p-4">
      <BackButton />
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="text-3xl my-4">{book.title}</h1>
          <div>{book._id}</div>
          <div>{book.author}</div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;

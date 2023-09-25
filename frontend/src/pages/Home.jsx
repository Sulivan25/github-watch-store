import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/watches")
      .then((response) => {
        setWatches(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Watches List</h1>
        <Link to="/watches/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">STT</th>
              <th className="border border-slate-600 rounded-md">Tên</th>
              <th className="border border-slate-600 rounded-md">Giá</th>
              <th className="border border-slate-600 rounded-md">Mô tả</th>
            </tr>
          </thead>
          <tbody>
            {watches.map((watch, index) => (
              <tr key={watch._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {watch.name}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {watch.price}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {watch.description}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/watches/details/${watch._id}`}>
                      <BsInfoCircle className="text-2x1 text-green-800" />
                    </Link>
                    <Link to={`/watches/edit/${watch._id}`}>
                      <AiOutlineEdit className="text-2x1 text-yellow-600" />
                    </Link>
                    <Link to={`/watches/delete/${watch._id}`}>
                      <MdOutlineDelete className="text-2x1 text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;

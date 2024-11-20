import React, { useEffect, useState } from "react";
// import { BsHeart, BsHeartFill, BsSendFill } from "react-icons/bs";
import { BsSendFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../../redux/config";
import axios from "axios";

function formatDate(dateString) {
  const date = new Date(dateString);
  const months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

const ProductComments = () => {
  const { id } = useParams();
  const [commentData, setCommentData] = useState("");
  const [totalComment, setTotalComment] = useState([]);
  const [render, setRender] = useState(false);
  const [commentId, setCommentId] = useState("");

  const postData = async (requestBody) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/comment/blog/comment`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      if (response.data) {
        setRender((p) => !p);
        setCommentData("");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const postDataReply = async (requestBody) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/comment/blog/commentreply`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      if (response.data) {
        setRender((p) => !p);
        setCommentData("");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchCommentsByBlogId(id);
  }, [id, render]);

  const fetchCommentsByBlogId = async (blogId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/comment/blog/${blogId}/comments`
      );

      setTotalComment(response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const commentSubmit = (e) => {
    e.preventDefault();
    if (commentId.trim().length > 0) {
      const finalCommentData = {
        blogId: id,
        description: commentData,
        commentId,
      };
      postDataReply(finalCommentData);
    } else {
      const finalCommentData = { blogId: id, description: commentData };
      postData(finalCommentData);
    }
    setCommentData("");
    setCommentId("");
  };
  return (
    <div>
      <section className="bg-transparent dark:bg-gray-900 py-5 antialiased w-full">
        <div className="px-4 w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-black/80 font-poppins dark:text-white">
              Comments ({totalComment.length})
            </h2>
          </div>
          <div className="max-h-[400px] overflow-auto px-3 w-full flex flex-col">
            {totalComment.map((e) => {
              return (
                <div className="w-full" key={e._id}>
                  <article className="p-6 text-base w-full bg-white rounded-lg dark:bg-gray-900">
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 capitalize text-sm text-gray-900 dark:text-white font-semibold">
                          <img
                            className="mr-2 w-6 h-6 rounded-full border shadow"
                            src={
                              e.userId?.image ||
                              "https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                            }
                            alt="Michael Gough"
                          />
                          {e.userId?.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <time
                            dateTime="2022-02-08"
                            title="February 8th, 2022"
                          >
                            {formatDate(e.date)}
                          </time>
                        </p>
                      </div>
                    </footer>
                    <p className="text-gray-500 dark:text-gray-400">
                      {e.description}
                    </p>
                    <div className="flex items-center mt-4 space-x-5">
                      {/* <div className="flex gap-1 items-center text-gray-500 cursor-pointer hover:text-blue-600 dark:text-gray-400 font-medium">
                        <span className="mr-1 text-base">(10)</span>
                        <BsHeartFill className="text-sm" />
                        <span className="mr-2 text-base">Likes</span>
                      </div> */}
                      <label
                        htmlFor="commentTe"
                        type="button"
                        className="flex cursor-pointer items-center text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 font-medium"
                        onClick={() => setCommentId(e._id)}
                      >
                        <span className="mr-2 text-base">(10)</span>
                        <svg
                          className="mr-1.5 w-3.5 mt-1 h-3.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                          />
                        </svg>
                        Reply
                      </label>
                    </div>
                  </article>
                  {e.commentRep.length > 0 && (
                    <>
                      {e.commentRep.map((comment, index) => (
                        <article
                          className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900"
                          key={index}
                        >
                          <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <p className="inline-flex capitalize items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                <img
                                  className="mr-2 w-6 h-6 border shadow rounded-full"
                                  src={comment.userId.image}
                                  alt={comment.userId.name}
                                />
                                {comment.userId.name}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                <time
                                  dateTime="2022-02-08"
                                  title="February 8th, 2022"
                                >
                                  {formatDate(comment.date)}
                                </time>
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                <time
                                  dateTime={comment.date}
                                  title={comment.date}
                                >
                                  {/* Render date */}
                                </time>
                              </p>
                            </div>
                          </footer>
                          <p className="text-gray-500 dark:text-gray-400">
                            {comment.description}
                          </p>
                        </article>
                      ))}
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <form className="pt-5 -mb-2" onSubmit={commentSubmit}>
            <div className="py-2 px-4 bg-white rounded-lg rounded-t-lg ">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <div className="flex relative items-center gap-4">
                <input
                  type="text"
                  id="commentTe"
                  className={`px-4 py-3 ${commentId.length > 0 ? "pr-28" : ""} w-full text-sm text-gray-900 focus:ring-0 rounded-lg focus:outline-none dark:text-white dark:placeholder-gray-400 border border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
                  placeholder="Write a comment..."
                  value={commentData}
                  onChange={(e) => setCommentData(e.target.value)}
                />
                {commentId.length > 0 && (
                  <div
                    onClick={() => setCommentId("")}
                    className="absolute right-[170px] text-xs border rounded cursor-pointer hover:bg-blue-500 hover:text-white duration-150 py-1 px-2"
                  >
                    Close Reply
                  </div>
                )}
                <button
                  type="submit"
                  className=" items-center py-3 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 text-nowrap flex gap-2"
                >
                  Post Comment <BsSendFill />
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ProductComments;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VideoPagination = ({ token }) => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchVideos();
  }, [currentPage]);

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        "https://reacttask.mkdlabs.com/v1/api/rest/video/PAGINATE",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-project": "cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            payload: {},
            page: currentPage,
            limit: 10,
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setVideos(responseData.list);
        setTotalPages(responseData.num_pages);
      } else {
        throw new Error("Failed to fetch videos");
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {videos.map((video) => (
        <div key={video.id}>
          <h3>{video.title}</h3>
          <img src={video.photo} alt={video.title} />
          <p>Likes: {video.like}</p>
        </div>
      ))}
        
      <h1 className="text-center mb-4">Video will available when video will added. But functionality is completed for pagination</h1>
     <div className="flex gap-4 rounded-lg items-center justify-center text-white">
     <button className="bg-gray-500 p-4" onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous
      </button>
      <button className="bg-gray-500 p-4" onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
     </div>
   <div className="text-center mt-4">
   <Link to="/"><button className="bg-blue-400 p-4">Back to Home</button></Link>
   </div>
    </div>
  );
};

export default VideoPagination;

import React, { useEffect, useState } from 'react'

function Registration() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const registrationsPerPage = 10;

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch("https://resin-backend.onrender.com/api/registrations");
        if (!response.ok) {
          throw new Error("Failed to fetch registrations");
        }
        let data = await response.json();
        // Sort by createdAt descending (most recent first)
        data = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRegistrations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(registrations.length / registrationsPerPage);
  const startIdx = (currentPage - 1) * registrationsPerPage;
  const endIdx = startIdx + registrationsPerPage;
  const currentRegistrations = registrations.slice(startIdx, endIdx);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handleBack = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <h1 className='text-2xl font-bold mb-4'>Registration Details</h1>
      <p className='text-gray-600 mb-4'>Here you can view the details of all registrations.</p>
      {loading && <div>Loading...</div>}
      {error && <div className='text-red-600 mb-4'>{error}</div>}
      {!loading && !error && registrations.length === 0 && (
        <div>No registrations found.</div>
      )}
      {!loading && !error && registrations.length > 0 && (
        <>
        <div className="mb-2 font-semibold text-blue-700">Total Registrations: {registrations.length}</div>
        <div className="overflow-x-scroll w-[100%] lg:w-[100%] mb-4">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-2 py-1 border">Name</th>
                <th className="px-2 py-1 border">Gender</th>
                <th className="px-2 py-1 border">Email</th>
                <th className="px-2 py-1 border">Phone</th>
                <th className="px-2 py-1 border">WhatsApp</th>
                <th className="px-2 py-1 border">Experience</th>
                <th className="px-2 py-1 border">Message</th>
                <th className="px-2 py-1 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {currentRegistrations.map((reg) => (
                <tr key={reg._id} className="even:bg-gray-50">
                  <td className="px-2 py-1 border">{reg.name}</td>
                  <td className="px-2 py-1 border">{reg.gender}</td>
                  <td className="px-2 py-1 border">{reg.email}</td>
                  <td className="px-2 py-1 border">{reg.phone}</td>
                  <td className="px-2 py-1 border">{reg.whatsapp}</td>
                  <td className="px-2 py-1 border">{reg.experience}</td>
                  <td className="px-2 py-1 border">{reg.message}</td>
                  <td className="px-2 py-1 border">{reg.createdAt ? new Date(reg.createdAt).toLocaleString() : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center gap-4 mt-2">
          <button
            onClick={handleBack}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Back
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Next
          </button>
        </div>
        </>
      )}
    </>
  )
}

export default Registration
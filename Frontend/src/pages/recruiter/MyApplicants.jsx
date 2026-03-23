import api from '@/api/axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import Loader from '@/components/common/Loader';
import ApplicantCard from '@/components/layout/ApplicantCard';

const MyApplicants = () => {
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalApplicants, setTotalApplicants] = useState(0);
    const { jobId }= useParams();
    useEffect(() => {
        const fetchApplicants = async () => {
            try {
            const res = await api.get(`/api/v1/application/${jobId}/my-applicants`)
           setApplicants(res.data.applicants)
           setTotalApplicants(res.data.totalApplicants)
            } catch (error) {
                toast.error(error.response?.data?.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        }

        fetchApplicants();
    }, [])

    if(loading) return <Loader />

 return (
  <div className="max-w-5xl mx-auto mt-11 px-4">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Applicants</h1>
      <span className="text-gray-500">{totalApplicants} Applicants</span>
    </div>

    <div className="space-y-4">
      {!applicants || applicants.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No applicants yet</p>
      ) : (
        applicants.map((app) => (
          <ApplicantCard key={app._id} app={app} />
        ))
      )}
    </div>
  </div>
);
}

export default MyApplicants
import React from 'react';
import RequestCard from '../../components/Request/RequestCard';

function Requests() {
  const requests = [
    {
      userName: 'John Doe',
      startupName: 'Tech Innovators',
      profilePic: 'https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      userName: 'Jane Smith',
      startupName: 'GreenTech Solutions',
      profilePic: 'https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    }
  ];

  return (
    <div className="px-2 md:px-4 py-4 max-h-screen bg-blue-50 dark:bg-yellow-100 rounded-lg">


      <div className='bg-gray-100 dark:bg-gray-900 px-4 md:px-8 py-4 rounded-lg'>

        <h1 className='text-2xl font-bold mb-8 text-black dark:text-white'>Pending Requests</h1>

        {requests.map((request, index) => (
        <RequestCard
            key={index}
            userName={request.userName}
            startupName={request.startupName}
            profilePic={request.profilePic}
        />
        ))}
      </div>

    </div>
  );
}

export default Requests;

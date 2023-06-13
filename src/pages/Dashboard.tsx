import React, { useContext, useEffect, useState } from 'react';
import NavBar from "../components/NavBar";
import { UserContext } from "../_store/user-context";

const Dashboard: React.FC  = () => {
  const  user = localStorage.getItem('user');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Perform any additional data fetching or initialization here
      setLoading(false);
    }
  }, [user]);

  if (!user) {
    // Redirect or show an error message if the user is not logged in
    return <div>You are not authorized to access this page.</div>;
  }

  if (loading) {
    // Show a loading message while waiting for the user context
    return <div>Loading...</div>;
  }


  return (<>
    <NavBar />

  </>);
}

export default Dashboard;
import React from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import UserNav from "../../components/dashboardNav/UserNav";
import "../../style/AdminDashboard.css";

const UserDashboard = () => {
  const user = useSelector(state => state.auth.user);
    return (
        <Layout>
            <div>
                <UserNav />
                <div className="dashboard-bazar">
                    <h2>{`${user.name}'s Dashboard`}</h2>
                    <hr />
                    <h3>Name: {user.name}</h3>
                    <h3>Email: {user.email}</h3>
                    <h3>Phone: {user.phone}</h3>
                    <h3>Address: {user.address}</h3>
                </div>
            </div>
        </Layout>
    );
};

export default UserDashboard;
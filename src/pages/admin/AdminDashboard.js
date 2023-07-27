import React from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import AdminNav from "../../components/dashboardNav/AdminNav";
import "../../style/AdminDashboard.css";

const AdminDashboard = () => {
  const admin = useSelector(state => state.auth.user);
    return (
        <Layout>
            <div>
                <AdminNav />
                <div className="dashboard-bazar">
                    <h2>{`${admin.name}'s Dashboard`}</h2>
                    <hr />
                    <h3>Name: {admin.name}</h3>
                    <h3>Email: {admin.email}</h3>
                    <h3>Phone: {admin.phone}</h3>
                    <h3>Address: {admin.address}</h3>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;

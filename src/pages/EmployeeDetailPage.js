import React from 'react';
import './EmployeeDetailPage.css';

const EmployeeDetailPage = ({match}) => {
    return (
        <h1>{match.params.id}</h1>
    );
};

export default EmployeeDetailPage;
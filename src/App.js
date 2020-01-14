import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import EmployeeDetailPage from './pages/EmployeeDetailPage';
import EmployeeListPage from './pages/EmployeeListPage';
import UseCredit from './pages/UseCredit';

function App() {
  return (
    <div className="App text-secondary">
      <Router>
        <Switch>
          <Route path="/" component={EmployeeDetailPage} exact/>
          <Route path="/employee-list" component={EmployeeListPage}/>
          <Route path="/employee/:id" component={EmployeeDetailPage}/>
          <Route path="/employee" component={EmployeeDetailPage}/>
          <Route path="/use-credit/:id" component={UseCredit}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

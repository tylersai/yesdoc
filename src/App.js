import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import EmployeeDetailPage from './pages/EmployeeDetailPage';
import EmployeeListPage from './pages/EmployeeListPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={EmployeeListPage} exact/>
          <Route path="/employee/:id" component={EmployeeDetailPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import React from "react";
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import "./App.css";
import Header from "./components/header/header.component";
import Home from "./components/home/home.component";
import Dashboard from "./components/dashboard/dashboard.component";
import withAuthentication from "./components/HOC/authenticate.hoc";
import Transaction from "./components/transaction/transaction.component";
import Report from "./components/report/report.component";
import Category from "./components/category/category.component";

class App extends React.Component {
	render(){
		const {isAuthenticated } = this.props
		return(
			<Router>
				<Header title="XPENSE"/>
				<Switch>
					<Route exact path='/' render = {()=> !isAuthenticated ? <Home/> : (<Redirect to='/dashboard'/>)  }/>
					<Route path = '/dashboard' component ={ withAuthentication(Dashboard) } />
					<Route exact path = '/transaction' component ={ withAuthentication(Transaction) } />
					<Route path = '/transaction/edit/:type/:id' component ={ withAuthentication(Transaction) } />
					<Route exact path = '/category' component ={ withAuthentication(Category) } />
					<Route exact path = '/report' component ={ withAuthentication(Report) } />
					<Route path='*' render = {()=> !isAuthenticated ? <Home/> : (<Redirect to='/dashboard'/>)  }/>
				</Switch>
			</Router>
		);
	}
}

const mapStateToProps = (state) =>({
	isAuthenticated : state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);

import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GoogleLogin } from "react-google-login";
import { CLIENT_ID } from '../../config/keys';
import { API_ORIGIN_URL } from '../../config/api';
import { googleAuthSignIn } from '../../redux/auth/auth.actions';

class GoogleSignIn extends React.Component {
	render(){
		return(
			<Fragment>
				<GoogleLogin
					clientId={CLIENT_ID}
					buttonText="Login"
					onSuccess={this.responseGoogle}
					onFailure={this.responseGoogle}
					cookiePolicy={"single_host_origin"}
				/>
			</Fragment>
		)
	}
	responseGoogle = async response => {		
		const link = `${API_ORIGIN_URL}/oauth/google/login`;
		await this.props.googleAuthLogin(link, response.tokenId);
		if(this.props.isAuthenticated)
			this.props.history.push('/dashboard');
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated : state.auth.isAuthenticated
})

const mapDispatchToProps = (dispatch) => ({
	googleAuthLogin : (url, tokenId) => dispatch(googleAuthSignIn(url, tokenId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GoogleSignIn));

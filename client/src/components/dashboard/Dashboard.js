import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import HomeResults from './HomeResults';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
    console.log('dashboard', profile);
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {console.log('dash jsx', profile)}
      <h1 className='large text-primary'>Team Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <h1>Team Name: {profile.teamName}</h1>
          <p>Race: {profile.race}</p>
          <p>Team value: {profile.teamValue ? profile.teamValue : 'Not set'}</p>
          <p>
            Treasury: {profile.teamTreasury ? profile.teamTreasury : 'Not set'}
          </p>
          <HomeResults result={profile.results} />
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not set up your team. Please add</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);

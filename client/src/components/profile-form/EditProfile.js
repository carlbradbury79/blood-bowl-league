import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    teamName: '',
    race: '',
    teamValue: '',
    teamTreasury: ''
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      race: loading || !profile.race ? '' : profile.race,
      teamName: loading || !profile.teamName ? '' : profile.teamName,
      teamValue: loading || !profile.teamValue ? '' : profile.teamValue,
      teamTreasury: loading || !profile.teamTreasury ? '' : profile.teamTreasury
    });
  }, [
    loading,
    getCurrentProfile,
    profile.race,
    profile.teamName,
    profile.teamValue,
    profile.teamTreasury
  ]);

  const { teamName, race, teamValue, teamTreasury } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Your Team Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get you started
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Race'
            name='race'
            value={race}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Race</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Team Name'
            name='teamName'
            value={teamName}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Team Name</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Team Value'
            name='teamValue'
            value={teamValue}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Team Value</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Treasury'
            name='teamTreasury'
            value={teamTreasury}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Team Treasury</small>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);

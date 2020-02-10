import React, { Fragment, useState, useEffect } from 'react';
import { Link, Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addResult } from '../../actions/profile';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const AddResult = ({
  addResult,
  history,
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const [formData, setFormData] = useState({
    // homeTeamName: '',
    homeTeamScore: '',
    homeTeamCas: '',
    awayTeamName: '',
    awayTeamScore: '',
    awayTeamCas: ''
  });

  const {
    // homeTeamName,
    homeTeamScore,
    homeTeamCas,
    awayTeamName,
    awayTeamScore,
    awayTeamCas
  } = formData;

  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      homeTeamName: profile.teamName
    });

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Add A Result</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add all details below
      </p>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();

          addResult(formData, history);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            // placeholder='* Your team name'
            // name='homeTeamName'
            // value={profile.teamName}
            readOnly
            defaultValue={profile.teamName}
            // onChange={e => onChange(e)}
            // required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Your score'
            name='homeTeamScore'
            value={homeTeamScore}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Your casulaties caused'
            name='homeTeamCas'
            value={homeTeamCas}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Away team name'
            name='awayTeamName'
            value={awayTeamName}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Away score'
            name='awayTeamScore'
            value={awayTeamScore}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Away casulties scpre'
            name='awayTeamCas'
            value={awayTeamCas}
            onChange={e => onChange(e)}
            required
          />
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddResult.propTypes = {
  addResult: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { addResult, getCurrentProfile })(
  AddResult
);

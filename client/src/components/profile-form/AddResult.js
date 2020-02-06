import React, { Fragment, useState } from 'react';
import { Link, Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addResult } from '../../actions/profile';

const AddResult = ({ addResult, history }) => {
  const [formData, setFormData] = useState({
    homeTeamName: '',
    homeTeamScore: '',
    homeTeamCas: '',
    awayTeamName: '',
    awayTeamScore: '',
    awayTeamCas: ''
  });

  const {
    homeTeamName,
    homeTeamScore,
    homeTeamCas,
    awayTeamName,
    awayTeamScore,
    awayTeamCas
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 class='large text-primary'>Add A Result</h1>
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
            placeholder='* Your team name'
            name='homeTeamName'
            value={homeTeamName}
            onChange={e => onChange(e)}
            required
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
  addResult: PropTypes.func.isRequired
};

export default connect(null, { addResult })(AddResult);

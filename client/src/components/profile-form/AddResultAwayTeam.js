import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';

const AddResultAwayTeam = ({ getProfiles, profile: { profiles, loading } }) => {
  const [chooseAway, setChooseAway] = useState(true);

  const [formData, setFormData] = useState({ awayTeamName: '' });

  const { awayTeamName } = formData;

  useEffect(() => {
    getProfiles();
    if (formData.awayTeamName === 'Not here') {
      console.log('Not here');
      setChooseAway(false);
      console.log(formData);
    }
  });

  const onChange = e => {
    console.log('change');
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    console.log(formData);
  };

  const toggle = () => {
    setChooseAway(!chooseAway);
  };

  return (
    <div className='form-group'>
      <button onClick={toggle}>Toggle</button>
      {chooseAway ? (
        <select
          name='awayTeamName'
          value={awayTeamName}
          onChange={e => onChange(e)}
        >
          <option value='grapefruit'>Grapefruit</option>
          <option value='lime'>Lime</option>
          <option value='coconut'>Coconut</option>
          <option value='Not here'>Not here</option>
        </select>
      ) : (
        <input
          type='text'
          placeholder='* Away team name'
          name='awayTeamName'
          value={awayTeamName}
          onChange={e => onChange(e)}
        />
      )}
    </div>
  );
};

AddResultAwayTeam.propTypes = {};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(AddResultAwayTeam);

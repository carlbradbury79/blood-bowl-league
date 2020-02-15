import React from 'react';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    teamName,
    teamValue,
    teamTreasury
  }
}) => {
  return (
    <div className='profile bg-light'>
      <div>
        <h2>{teamName}</h2>
        <p>Coach: {name}</p>
        {teamValue ? <p>Value {teamValue}</p> : null}
        {teamTreasury ? <p>Treasury {teamTreasury}</p> : null}
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;

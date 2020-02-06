import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteResult } from '../../actions/profile';

const HomeResults = ({ result, deleteResult }) => {
  console.log(result);
  const results = result.map(game => {
    let result = '';
    if (parseInt(game.homeTeamScore) > parseInt(game.awayTeamScore)) {
      result = 'Win';
    } else if (parseInt(game.homeTeamScore) < parseInt(game.awayTeamScore)) {
      result = 'Lose';
    } else {
      result = 'Draw';
    }
    console.log(game._id);

    return (
      <tr key={game._id}>
        <td>{game.awayTeamName}</td>
        <td className='hide-sm'>{result}</td>
        <td>
          {game.homeTeamScore}-{game.awayTeamScore}
        </td>
        <td className='btn btn-danger' onClick={() => deleteResult(game._id)}>
          Delete
        </td>
      </tr>
    );
  });
  return (
    <Fragment>
      <h2 className='my-2'>Result</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Opponent</th>
            <th className='hide-sm'>Result</th>
            <th className='hide-sm'>Score</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{results}</tbody>
      </table>
    </Fragment>
  );
};

HomeResults.propTypes = {
  result: PropTypes.array.isRequired,
  deleteResult: PropTypes.func.isRequired
};

export default connect(null, { deleteResult })(HomeResults);

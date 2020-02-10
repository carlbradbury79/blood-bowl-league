import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';

const LeagueTable = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, []);

  const league = [];

  profiles.map(profile => {
    //   console.log(profile)
    const team = new Object();
    team.teamName = profile.teamName;
    team.score = 0;
    team.casulties = 0;
    league.push(team);
  });

  console.log(league);

  profiles.map(profile => {
    let newAwayLeague = profile.results.reduce((accumulator, currentValue) => {
      if (accumulator.indexOf(currentValue.awayTeamName) === -1) {
        accumulator.push(currentValue.awayTeamName);
      }
      const team = new Object();
      team.teamName = currentValue.awayTeamName;
      team.score = 0;
      team.casulties = 0;
      league.push(team);
      return accumulator;
    }, []);

    console.log('nAL', newAwayLeague);
  });
  let finalLeague = [];
  let sortedLeague = league.reduce(function(accumulator, currentValue) {
    if (accumulator.indexOf(currentValue.teamName) === -1) {
      const team = new Object();
      team.teamName = currentValue.teamName;
      team.played = 0;
      team.won = 0;
      team.drawn = 0;
      team.lost = 0;
      team.score = 0;
      team.casulties = 0;
      finalLeague.push(team);
      accumulator.push(currentValue.teamName);
    }

    return accumulator;
  }, []);

  //   console.log('sortedLeague', sortedLeague);

  //   console.log('league', league);
  console.log('finalLeague', finalLeague);

  // Set the games played

  profiles.map(team => {
    team.results.map(result => {
      finalLeague.map(team => {
        if (team.teamName === result.homeTeamName) {
          team.played++;
          team.casulties += result.homeTeamCas;
        }
        if (team.teamName === result.awayTeamName) {
          team.played++;
          team.casulties += result.awayTeamCas;
        }
      });
    });
  });

  //   Set the wins and points
  profiles.map(team => {
    team.results.map(result => {
      console.log(result.homeTeamScore, result.awayTeamScore);
      if (result.homeTeamScore > result.awayTeamScore) {
        console.log('home win');
        finalLeague.map(team => {
          console.log(team.teamName, result.homeTeamName);
          if (team.teamName === result.homeTeamName) {
            console.log('yep');
            team.score += 3;
            team.won++;
          }
        });
      } else if (result.homeTeamScore < result.awayTeamScore) {
        console.log('away win');
        finalLeague.map(team => {
          console.log(team.teamName, result.homeTeamName);
          if (team.teamName === result.awayTeamName) {
            console.log('yep');
            team.score += 3;
            team.won++;
          }
        });
      } else {
        console.log('Draw');
        finalLeague.map(team => {
          console.log(team.teamName, result.homeTeamName);
          if (
            team.teamName === result.homeTeamName ||
            team.teamName === result.awayTeamName
          ) {
            console.log('yep');
            team.score += 1;
            team.drawn++;
          }
        });
      }
    });
  });

  console.log(finalLeague);

  let leaguePositions = finalLeague.sort((a, b) => {
    const teamA = a.score;
    const teamB = b.score;

    let comparison = 0;
    if (teamA > teamB) {
      comparison = 1;
    } else if (teamA < teamB) {
      comparison = -1;
    }
    return comparison * -1;
  });

  console.log(leaguePositions);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>League Table</h1>
          <div className='profiles'>
            {profiles.length > 0 ? (
              leaguePositions.map(team => (
                <p>
                  Team name:{team.teamName} | Played: {team.played} | Won:{' '}
                  {team.won} | Drawn: {team.drawn} | Points: {team.score} |
                  Casulties caused: {team.casulties}{' '}
                </p>
              ))
            ) : (
              <Spinner />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

LeagueTable.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(LeagueTable);

import React from 'react';
import { connect } from 'react-redux';
import { Alert, Button } from 'react-bootstrap';
import { PulseLoader } from 'react-spinners';
import { setSheetId } from '../actions/sheetData';
import { DEMO_SHEETID } from '../constants';

/**
 * InfoView component, displayed when there's no chart yet
 */
const InfoView = ({ appStatus, dispatch }) => {
  return (
    <div className="sheets-container shadow">
      {appStatus.authError && (
        <Alert variant="danger">
          <Alert.Heading>Oh snap!</Alert.Heading>
          <p>
            It looks like your Spreadsheet is private, please change its access
            to <strong>Anyone with the link</strong> and then try again
          </p>
        </Alert>
      )}
      {appStatus.error && (
        <Alert variant="danger">
          <Alert.Heading>Oh snap!</Alert.Heading>
          <p>It looks like there is a connection issue, please try again.</p>
        </Alert>
      )}
      {!appStatus.fetchingData && (
        <Alert variant="success">
          <Alert.Heading>Hey, you wanna create some charts ?</Alert.Heading>
          <p>
            After you paste in the URL to a public Google spreadsheet, you’ll be
            able to change the grid, colors, labels, legends, and other cool
            stuff
          </p>
          <p>
            Make sure your spreadsheet follows the{' '}
            <a
              href="https://github.com/postlight/robo-chart-web#spreadsheet-format"
              target="_blank"
              rel="noopener noreferrer"
            >
              correct format!
            </a>
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button
              onClick={() => dispatch(setSheetId(DEMO_SHEETID))}
              variant="outline-success"
            >
              No Spreadsheet yet? Click me!
            </Button>
          </div>
        </Alert>
      )}
      {appStatus.fetchingData && (
        <div className="sheets-container">
          <div className="loader">
            <PulseLoader
              color="#5c646d"
              loading={appStatus.fetchingData}
              className="loader"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  appStatus: state.appStatus,
});

export default connect(mapStateToProps)(InfoView);

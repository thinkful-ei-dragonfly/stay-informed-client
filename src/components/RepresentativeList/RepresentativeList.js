import React from 'react';
import './RepresentativeList.css';
import UserContext from '../../contexts/UserContext';

export default class RepresentativeList extends React.Component {
  static contextType = UserContext;

  // TODO determine how to and ideal way to handle missing photos
  // TODO (some seem to lack one from civic api? check to see if last name match capture on back end is perfect.) Looked ok on brief glance to me.
  // This generates the element for each representative tile in the pane
  generateRepList() {
    if (this.context.representatives) {
      const repElems = this.context.representatives.map((rep, idx) => {
        const title = rep.roles[0].short_title;
        // get district if representative
        const district =
          title === 'Rep.' ? `District ${rep.roles[0].district}` : '';
        // to check if photo exists for representative
        const photoUrl = rep.photoUrl;
        return (
          <li key={idx} className="representative">
            {photoUrl ? (
              <img
                className="headshot"
                src={rep.photoUrl}
                alt={`professional photographic headshot of ${rep.first_name} ${
                  rep.last_name
                }`}
              />
            ) : (
              ''
            )}
            <h3 className="rep-name">{`${title} ${rep.first_name} ${
              rep.last_name
            }`}</h3>
            <p>
              <span className="rep-field">State: </span>
              <span className="field-val">
                {rep.roles[0].state} {district}
              </span>
            </p>
            <p>
              <span className="rep-field">Party: </span>
              <span className="field-val">{rep.roles[0].party}</span>
            </p>
            <button
              onClick={e => this.props.handleClickRepDetails(e, rep.member_id)}
              className="go-details"
            >
              Learn More
            </button>
          </li>
        );
      });
      return repElems;
    }
  }

  render() {
    const repElemList = this.generateRepList();

    return (
      <div id="rep-pane">
        <h2>Your Congress Representatives</h2>
        <ul id="rep-list">{repElemList}</ul>
      </div>
    );
  }
}

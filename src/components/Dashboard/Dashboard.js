import React from 'react';
import UserContext from '../../contexts/UserContext';
import RepresentativeService from '../../services/representatives-service';
import RepresentativeList from '../../components/RepresentativeList/RepresentativeList.js';
import Spinner from '../Spinner/Spinner'

export default class Dashboard extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  static contextType = UserContext;


  componentDidMount() {

    if (this.context.user.address) {

      this.context.setFetching(true)
      
      RepresentativeService.getReps(this.context.user.address).then(res => {
        if (res.state) {
          this.context.setUserState(res.state.toUpperCase());
        }
        if (res.district) {
          this.context.setUserDistrict(res.district);
        }
        if (res.representatives) {
          this.context.setRepresentatives(res.representatives);
        }
        this.context.setFetching(false)
      });
    }
  }

  handleClickRepDetails = (e, repId) => {
    e.preventDefault();

    const { location, history } = this.props;
    const destination =
      (location.state || {}).from || `/representatives/${repId}`;
    history.push(destination);
  };


  render() {
    let myData = '';

    if (this.context.user.address) {
      myData = (
        <aside className="myData">
          <h1>My District</h1>
          <p>
            <span className="bold">State:</span> {this.context.state}
          </p>
          <p>
            <span className="bold">District:</span> {this.context.district}
          </p>
        </aside>
      );
    }
    return (
      <div>
        {this.context.fetching ? (<Spinner/>) :
        (<section className="dashboard">
          <header>Dashboard</header>
          {myData}
          <RepresentativeList
            handleClickRepDetails={this.handleClickRepDetails}
          />
        </section>)
      }
      </div>
    );
  }
}

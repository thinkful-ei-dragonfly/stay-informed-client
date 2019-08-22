import React from 'react';
import UserContext from '../../contexts/UserContext';
import RepresentativeService from '../../services/representatives-service';
import RepresentativeList from '../../components/RepresentativeList/RepresentativeList.js';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';
import NewsList from '../NewsList/NewsList';
import './Dashboard.scss'

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
      this.context.setFetching(true);

      RepresentativeService.getReps(this.context.user.address)
        .then(res => {
          if (res.state) {
            this.context.setUserState(res.state.toUpperCase());
          }
          if (res.district) {
            this.context.setUserDistrict(res.district);
          }
          if (res.representatives) {
            this.context.setRepresentatives(res.representatives);
          }
          this.context.setFetching(false);
        })
        .then(() => {
          RepresentativeService.getNews(
            this.context.representatives[0],
            this.context.representatives[1],
            this.context.representatives[2]
          )
            .then(news => this.context.setNews(news.articles))
            //.catch(error => this.context.setError(error));
        }).catch(error => this.context.setError(error));
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
          <h2 className='subtitle'>My District</h2>
          <div className='myData-text'>
            <p>
              <span className="repPage-span">State</span> {this.context.state}
            </p>
            <p>
              <span className="repPage-span">District</span> {this.context.district}
            </p>
            <p>
              <Link to="/voter-registration" className='register-link'>
                Not registered to vote? Register here.
              </Link>
            </p>
          </div>

        </aside>
      );
    }
    return (
      <main className='mainDashboard'>

        {(this.context.fetching && !this.context.error) ? (
          <Spinner />
        ) : (
          <>
            <section className="dashboard">
              {myData}
              <RepresentativeList
                handleClickRepDetails={this.handleClickRepDetails}
              />
            </section>
            <section className='NewsList'>
              <NewsList />
            </section>
          </>
        )}

      </main>
    );
  }
}

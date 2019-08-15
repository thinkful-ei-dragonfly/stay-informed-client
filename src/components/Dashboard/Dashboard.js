import React from 'react'
import UserContext from '../../contexts/UserContext'
// import RepresentativeList from ''
// waiting on Rob's code

export default class Dashboard extends React.Component {
  static contextType = UserContext


  componentDidMount() {
    // If the login form is successful, we need to store the user in context
    // if there's a user in context, do a request to /api/representatives for reps & state / district
  }

  render() {
    let myData = ''

    let RepresentativeList = ''
    // Empty string for now, will be updated with Rob's component
    if (this.context.user) {
      myData = (
        <aside className='myData'>
          <h1>My District</h1>
          <p><span className='bold'>State:</span> {this.context.state}</p>
          <p><span className='bold'>District:</span> {this.context.district}</p>
        </aside>
      )
    }
    return (
      <section className='dashboard'>
        <header>Dashboard</header>
        {myData}
        {RepresentativeList}
      </section>
    )
  }
}

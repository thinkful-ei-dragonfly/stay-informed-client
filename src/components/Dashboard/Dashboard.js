import React from 'react'
import UserContext from '../../contexts/UserContext'
import RepresentativeService from '../../services/representatives-service'
// import RepresentativeList from ''
// waiting on Rob's code

export default class Dashboard extends React.Component {
  static contextType = UserContext


  componentDidMount() {
    if (this.context.user.address) {
      RepresentativeService.getReps(this.context.user.address)
        .then(res => {
          if (res.state) {
            this.context.setUserState(res.state.toUpperCase())
          }
          if (res.district) {
            this.context.setUserDistrict(res.district)
          }
          if (res.representatives) {
            this.context.setRepresentatives(res.representatives)
          }
        })

    }
  }

  render() {
    let myData = ''

    let RepresentativeList = ''
    // Empty string for now, will be updated with Rob's component
    if (this.context.user.address) {
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

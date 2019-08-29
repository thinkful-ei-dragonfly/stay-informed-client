import React from 'react'

export default class TextContributions extends React.Component {
  render() {
    let contribList = ''
    let contribHeader = ''
    if (this.props.contributions) {
      if (this.props.contributions[0].org_name) {
        contribHeader = 'Top Contributors'
        contribList = this.props.contributions.map(line => {
          const total = parseInt(line.total).toLocaleString();
          console.log(total);
          return (
            <p className='contributionItem' key={line.org_name}>
              <span className='repPage-span'>{line.org_name}</span>
              <span className='contributionAmount'>${total}</span>
            </p>
          )
        })
      }
      else {
        contribHeader = 'Top Industries'
        contribList = this.props.contributions.map(line => {
          const total = parseInt(line.total).toLocaleString();
          if (line.industry_name === 'TV/Movies/Music') {
            return (
              <p className='contributionItem' key={line.industry_name}>
                <span className='repPage-span'>TV / Movies / Music</span>
                <span className='contributionAmount'>${total}</span>
              </p>
            )
          }
          return (
            <p className='contributionItem' key={line.industry_name}>
              <span className='repPage-span'>{line.industry_name}</span>
              <span className='contributionAmount'>${total}</span>
            </p>
          )
        })
      }
    } else if (this.props.contribs) {
      contribHeader = 'Total Contributions in the last cycle'
      const total_donations = parseInt(this.props.contribs.total_donations).toLocaleString();
      const spent = parseInt(this.props.contribs.spent).toLocaleString();
      const cash_on_hand = parseInt(this.props.contribs.cash_on_hand).toLocaleString();

      contribList = (
        <>
        <p className='contributionItem'>
          <span className='repPage-span'>Total Donations</span>
          <span className='contributionAmount'>${total_donations}</span>
        </p>
        <p className='contributionItem'>
          <span className='repPage-span'>Spent {' '} {'  '}</span>
          <span className='contributionAmount'>${spent}</span>
        </p>
        <p className='contributionItem'>
          <span className='repPage-span'>Cash on Hand</span>
          <span className='contributionAmount'>${cash_on_hand}</span>
        </p>

        </>
      )
    }


    return (
      <div className='mobile-contributions'>
        <h2>{contribHeader}</h2>
        {contribList}
      </div>
    )
  }
}

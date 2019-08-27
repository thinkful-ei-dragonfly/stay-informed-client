import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='appFooter' role='contentinfo'>
      <header className='footerHeader'>
        <h2 className="footerLogo">
          <Link to="/">
            <span className="logo-red">Stay</span>
            <span className="logo-blue">Informed</span>
          </Link>
        </h2>
      </header>
      <section className='footerLeft'>
        <h3 className='createdBy'>Created by &#123; teamName: null &#125;</h3>
        <p className='teamMembersHeading'>Team Members</p>
        <ul className='teamMembers'>
          <li><a href='https://github.com/michaelbravo777' target='_blank' rel='noreferrer noopener'>Michael Bravo</a></li>
          <li><a href='https://github.com/iAmDusan' target='_blank' rel='noopener noreferrer'>Michael Dusaniwskyj</a></li>
          <li><a href='https://github.com/DustinHaefele' target='_blank' rel='noopener noreferrer'>Dustin Haefele</a></li>
          <li><a href='https://github.com/lucasvocos' target='_blank' rel='noreferrer noopener'>Lucas Vocos</a></li>
          <li><a href='https://github.com/RobertWiggins' target='_blank' rel='noreferrer noopener'>Robert Wiggins</a></li>
        </ul>
      </section>
      <section className='footerRight'>
        <aside className='codeLinks'>
          <p>Code:</p>
          <ul className='codeLinksList'>

            <li className='codeLink'><a href='https://github.com/thinkful-ei-dragonfly/stay-informed-client' target='_blank' rel='noopener noreferrer'>&#123;Frontend&#125;</a></li>
            <li className='codeLink'><a href='https://github.com/thinkful-ei-dragonfly/stay-informed-api' target='_blank' rel='noopener noreferrer'>&#123;Backend&#125;</a></li>
          </ul>

        </aside>

        <p className='attribs'>
          This project leverages the following resources:{' '}
          <a
            className="attribution-link"
            href="https://developers.google.com/civic-information/"
          >
            Google Civic Api
          </a>
          ,{' '}
          <a
            className="attribution-link"
            href="https://www.propublica.org/datastore/apis"
          >
            ProPublica API
          </a>
          ,{' '}
          <a
            className="attribution-link"
            href="https://www.opensecrets.org/open-data/api"
          >
            OpenSecrets API
          </a>
          ,{' '}
          <a
            className="attribution-link"
            href="https://github.com/unitedstates/images"
          >
            United States Images Github,
          </a>{' '}
          and{' '}
          <a className="attribution-link" href="https://newsapi.org/">
            NewsAPI.org
          </a>
        </p>
      </section>

    </footer>
  );
}

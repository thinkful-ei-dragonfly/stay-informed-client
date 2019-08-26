import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';

//TODO Make semantic.
//Thanks to API's we used
//Team Name
//Github links
//Team Info
//ABOUT PAGE

export default function Footer() {
  return (
    <footer>
      <section className='left'>
        <h1 className="Footer-Logo">
          <Link to="/">
            <span className="logo-red">Stay</span>
            <span className="logo-blue">Informed</span>
          </Link>
        </h1>
        <h2 className='git-links'>Checkout our <a className ='source-link' href='https://github.com/thinkful-ei-dragonfly/stay-informed-client'>&lt; Front End /&gt;</a> and <br /><a className ='source-link' href='https://github.com/thinkful-ei-dragonfly/stay-informed-api'>&#123; Back End &#125;</a>  source code on GitHub</h2>

        <p className='bottom'>Brought to you by &#123; teamName: null &#125;</p>
      </section>
      <section className='right'>
        <aside>
        <h3>Team Members</h3>
          <ul>
            <li>Michael Bravo</li>
            <li>Michael Dusaniwskyj</li>
            <li>Dustin Haefele</li>
            <li>Lucas Vocos</li>
            <li>Rob Wiggins</li>
          </ul>
        </aside>
        
        <p className='attribs'>
          Made possible by{' '}
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
            United States Images Github
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

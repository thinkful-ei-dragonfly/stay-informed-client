import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import FinancialContributions from './FinancialContributions';

it('renders without crashing', () => {
  const div = document.createElement('div');
  // make necessary contributions prop to pass in
  const contributors = {
    topContributors: [
      {
        org_name: 'Club for Growth',
        total: '99252',
        pacs: '0',
        indivs: '99252',
      },
      {
        org_name: 'Delta Air Lines',
        total: '51000',
        pacs: '15000',
        indivs: '36000',
      },
      {
        org_name: 'Georgia Power',
        total: '47950',
        pacs: '15000',
        indivs: '32950',
      },
      {
        org_name: 'KPMG LLP',
        total: '47200',
        pacs: '15000',
        indivs: '32200',
      },
      {
        org_name: 'National Republican Senatorial Cmte',
        total: '45400',
        pacs: '45400',
        indivs: '0',
      },
      {
        org_name: 'Home Depot',
        total: '43650',
        pacs: '15000',
        indivs: '28650',
      },
      {
        org_name: 'Southeastern Minerals',
        total: '42600',
        pacs: '0',
        indivs: '42600',
      },
      {
        org_name: 'Cox Enterprises',
        total: '42400',
        pacs: '11000',
        indivs: '31400',
      },
      {
        org_name: 'AFLAC Inc',
        total: '39750',
        pacs: '17500',
        indivs: '22250',
      },
      {
        org_name: 'Hoover Foods',
        total: '39400',
        pacs: '0',
        indivs: '39400',
      },
    ],
    topIndustries: [
      {
        industry_code: 'W06',
        industry_name: 'Retired',
        indivs: '1720325',
        pacs: '0',
        total: '1720325',
      },
      {
        industry_code: 'F07',
        industry_name: 'Securities & Investment',
        indivs: '934284',
        pacs: '77000',
        total: '1011284',
      },
      {
        industry_code: 'F10',
        industry_name: 'Real Estate',
        indivs: '590987',
        pacs: '29000',
        total: '619987',
      },
      {
        industry_code: 'Q03',
        industry_name: 'Leadership PACs',
        indivs: '0',
        pacs: '511600',
        total: '511600',
      },
      {
        industry_code: 'K01',
        industry_name: 'Lawyers/Law Firms',
        indivs: '357592',
        pacs: '63500',
        total: '421092',
      },
      {
        industry_code: 'F09',
        industry_name: 'Insurance',
        indivs: '226145',
        pacs: '113000',
        total: '339145',
      },
      {
        industry_code: 'F13',
        industry_name: 'Misc Finance',
        indivs: '290350',
        pacs: '6000',
        total: '296350',
      },
      {
        industry_code: 'N01',
        industry_name: 'Food & Beverage',
        indivs: '172700',
        pacs: '71600',
        total: '244300',
      },
      {
        industry_code: 'N05',
        industry_name: 'Business Services',
        indivs: '242261',
        pacs: '1000',
        total: '243261',
      },
      {
        industry_code: 'H01',
        industry_name: 'Health Professionals',
        indivs: '201590',
        pacs: '40500',
        total: '242090',
      },
    ],
  };

  const topContribs = contributors.topContributors;
  const topIndustries = contributors.topIndustries;

  ReactDOM.render(
    <BrowserRouter>
      <FinancialContributions contributions={topContribs} />
      <FinancialContributions contributions={topIndustries} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

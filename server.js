'use strict'
const express = require('express')
const app = express()
const Airtable = require('airtable')


// Following this tutorial
// https://medium.freecodecamp.org/express-js-and-aws-lambda-a-serverless-love-story-7c77ba0eaa35
// See docs: https://airtable.com/appzeqG8nWiyOHXXY/api/docs#nodejs/table:organizations:list

const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base(process.env.REACT_APP_AIRTABLE_BASE);

app.get('/', (req, res) => {
  const nodes = [];
  const links = [];
  base('Organizations').select({
    maxRecords: 200,
  }).eachPage((records, fetchNextPage) => {
    records.forEach((record) => {
      nodes.push({
        id: record.id,
        orgName: record.get('Name'),
      })
      const linksAsDest = record.get('Links as Dest') || [];
      const linksAsSource = record.get('Links as Source') || [];
      linksAsDest.forEach(destLink =>
        links.push({
          source: destLink,
          target: record.id,
        })
      )
      linksAsSource.forEach(sourceLink =>
        links.push({
          source: record.id,
          target: sourceLink,
        })
      )
    });
    // CHANGE THIS TO GITHUB PAGES ASAP
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.json({
      fetchedNodes: nodes,
      fetchedLinks: links,
    })
  }, (err) => {
    console.error(err);
  });
})


module.exports = app

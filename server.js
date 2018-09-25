'use strict'
const express = require('express')
const app = express()


// Following this tutorial
// https://medium.freecodecamp.org/express-js-and-aws-lambda-a-serverless-love-story-7c77ba0eaa35
// See docs: https://airtable.com/appzeqG8nWiyOHXXY/api/docs#nodejs/table:organizations:list

// TODO: actually send back data with lambda

const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base(process.env.REACT_APP_AIRTABLE_BASE);

base('Organizations').select({
  maxRecords: 200,
}).eachPage((records, fetchNextPage) => {
  const nodes = [];
  const links = [];
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
  this.setState({
    fetchedNodes: nodes,
    fetchedLinks: links,
  })
  // fetchNextPage();
}, (err) => {
  if (err) { console.error(err); return <div>Error :(</div>; }
  });


app.get('/', (req, res) => res.send('Hello world!'))

module.exports = app

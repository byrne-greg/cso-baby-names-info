# Popular usage of first names in Ireland (WebApp)

## Mission

Deliver a web app that uses CSO data to determine the popular usage of first names in Ireland

## Machiavellian Personal Agenda

To gain practical experience and experiment in tech/libs that handle different aspects of front-end web-app design. This included a means to store client-side data, a way to handle front-end routing, using a web design system, handling third-party data requests, and data visualisation. It also had the design goal of being super user-friendly and simple.

## Demo

See https://popularfirstnamesinireland.surge.sh/

## What's it made of?

### Technology

- [ReactJS](https://reactjs.org/)
- [Redux (React)](https://react-redux.js.org/)
- [React Router](https://reacttraining.com/react-router/) - Declaritive routing for React
- [query-string](https://www.npmjs.com/package/query-string) - Efficient string parsing for URL queries
- [Axios](https://github.com/axios/axios) - Making promise based HTTP requests
- [Ant Design](https://ant.design/) - UI Library
- [Victory](https://formidable.com/open-source/victory/) - Data visualization
- [JSONStat Toolkit](https://json-stat.org/) - Library to process JSON-stat responses

### Build

- Version controlled using Git (_obviously_)
- Built using [Travis CI](https://travis-ci.org/)
- Deployed as a static application with [Surge](https://surgh.sh/)

### Data

It uses datasets from the [Central Statistics Office Statbank Database API], namely:

- VSA05 - Boys Names in Ireland with 3 or More Occurrences (1964-2017)
- VSA10 - Boys Names Registered in Ireland (1998-2017)
- VSA11 - Girls Names Registered in Ireland (1998-2017)
- VSA12 - Girls Names in Ireland with 3 or More Occurrences (1964-2017)

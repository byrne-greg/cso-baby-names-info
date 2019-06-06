import React from "react";
import PropTypes from "prop-types";
import { Button, Row, Card } from "antd";

const BabyNameIntroduction = props => {
  const { handleDisplayToggle } = props;
  return (
    <React.Fragment>
      <Row>
        <TitleCard />
      </Row>
      <Row>
        <WhatIsThisCard showApp={handleDisplayToggle} />
        <WhatIsItDoingCard />
        <WhoCreatedThisCard />
        <WhyCreateThisCard />
      </Row>
      <Row>
        <WhatIsItMadeOfCard />
      </Row>
    </React.Fragment>
  );
};

BabyNameIntroduction.propTypes = {
  handleDisplayToggle: PropTypes.func.isRequired
};

const TitleCard = () => (
  <Card style={{ backgroundColor: "#b7eb8f", textAlign: "center" }}>
    <h1>Popular usage of first names in Ireland</h1>
  </Card>
);

const WhatIsThisCard = props => {
  const { showApp } = props;
  return (
    <Card>
      <div id="what-is-this">
        <h2>What is this?</h2>
        <p>
          {`This app shows the popularity and usage of `}
          <a
            href="https://dictionary.cambridge.org/dictionary/english/forename"
            target="_blank"
            rel="noopener noreferrer"
          >
            first names/forenames
          </a>
          {` in Ireland `}
          <span role="img" aria-label="ireland">
            🇮🇪
          </span>
        </p>
        <Button type="primary" onClick={showApp}>
          Show App
        </Button>
      </div>
    </Card>
  );
};
WhatIsThisCard.propTypes = {
  showApp: PropTypes.func.isRequired
};

const WhatIsItDoingCard = () => (
  <Card>
    <div id="what-is-it-doing">
      <h2>What is it doing?</h2>
      <p>
        {`It shows popular usage data of forenames by retreiving and parsing data collected from the `}
        <a href="https://www.cso.ie/" target="_blank" rel="noopener noreferrer">
          Central Statistics Office Ireland
        </a>
        {` and then displaying it in a user-friendly and informative UI.`}
      </p>
    </div>
  </Card>
);
const WhoCreatedThisCard = () => (
  <Card>
    <div id="what-created-this">
      <h2>Who created this... thing?</h2>
      <p>All blame can be pointed to</p>
      <div className="LI-profile-badge"  data-version="v1" data-size="medium" data-locale="en_US" data-type="horizontal" data-theme="light" data-vanity="byrne-greg"><a className="LI-simple-link" href='https://ie.linkedin.com/in/byrne-greg?trk=profile-badge'>Greg Byrne</a></div>
      <p><br/>As written in fire in letters thirty feet high on the far side of the Quentulus Quazgar Mountains, <i>"We apologise for the inconvenience.”</i></p>
    </div>
  </Card>
);

const WhyCreateThisCard = () => (
  <Card>
    <div id="why-create-this">
      <h2>Why would you create this?</h2>
      <p>
        I built this web-app as an exercise in creating a modern web
        application. The point was to experiment in tech/libs that handle
        different aspects of front-end web-app design. This included a means to
        store client-side data, a way to handle front-end routing, using a web
        design system, handling third-party data requests, and data
        visualisation. It also had the design goal of being super user-friendly
        and simple.
      </p>
      <p>Is it perfect? By Batman's black shorts, No! 
        <span role="img" aria-label="bat">
          🦇
        </span>
      </p>
      <p>
        There is scope for lots of improvements, especially as the amount of
        data retreived from the CSO would be better retrieved, parsed and served
        from an intermediate server as opposed to client-side storage (for user
        considerations of speed and data allowances), but hey, once I master
        full-stack applications, I'll get back to you 
        <span role="img" aria-label="smile">
          😊
        </span>
      </p>
    </div>
  </Card>
);

const WhatIsItMadeOfCard = () => (
  <Card>
    <div id="what-is-it-made-of">
      <h2>What's it made of?</h2>
      <WhatIsItMadeOfTechCard />
      <WhatIsItMadeOfBuildCard />
      <WhatIsItMadeOfDataCard />
    </div>
  </Card>
);

const WhatIsItMadeOfTechCard = () => (
  <Card>
    <h3>Technology</h3>
    <p>This web-app is composed of:</p>
    <ul>
      <li><a
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React JS
          </a> - To build the app itself!</li>
      <li><a
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux (React)
          </a> - Predictable state container on the client</li>
      <li><a
            href="https://github.com/ReactTraining/react-router"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Router
          </a> - Declaritive routing for React</li> 
      <li><a
            href="https://www.npmjs.com/package/query-string"
            target="_blank"
            rel="noopener noreferrer"
          >
            query-string
          </a> - Efficient string parsing for URL queries</li>
      <li><a
            href="https://github.com/axios/axios"
            target="_blank"
            rel="noopener noreferrer"
          >
            Axios
          </a> - Making promise based HTTP requests</li>
      <li><a
            href="https://ant.design/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ant Design
          </a> - UI Library</li>
      <li><a
            href="https://formidable.com/open-source/victory/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Victory
          </a> - Data visualization</li>
      <li><a
            href="https://json-stat.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            JSONStat Toolkit
          </a> - Library to process JSON-stat responses</li>
    </ul>
  </Card>
);

const WhatIsItMadeOfBuildCard = () => (
  <Card>
    <h3>Build</h3>

    <ul>
      <li>Version controlled using <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
           Git
          </a></li>
      <li>Built using <a
            href="https://travis-ci.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
           Travis
          </a></li>
      <li>Deployed as a static application with <a
            href="https://surge.sh/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Surge
        </a>
      </li>
    </ul>
  </Card>
);

const WhatIsItMadeOfDataCard = () => (
  <Card>
    <h3>Data</h3>
    <p>
      {`It uses datasets from the `}
      <a
        href="https://www.cso.ie/webserviceclient/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Central Statistics Office Statbank Database API
      </a>
      {`, namely:`}
    </p>
    <ul>
      <li>
        VSA05 - Boys Names in Ireland with 3 or More Occurrences (1964-2017)
      </li>
      <li>VSA10 - Boys Names Registered in Ireland (1998-2017)</li>
      <li>VSA11 - Girls Names Registered in Ireland (1998-2017)</li>
      <li>
        VSA12 - Girls Names in Ireland with 3 or More Occurrences (1964-2017)
      </li>
    </ul>
  </Card>
);

export default BabyNameIntroduction;

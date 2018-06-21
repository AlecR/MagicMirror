#!/bin/sh

MODULE_NAME="$1"
POPOUT_NAME=${MODULE_NAME}Popout

echo "Creating Module: $MODULE_NAME"
cd "./client/src/modules"
mkdir "./$MODULE_NAME"
cd "./$MODULE_NAME"

echo "Generating config.json"
cat >config.json <<EOL
{
  "name": "$MODULE_NAME",
  "description": "Add your module description here",
  "componentFile": "$MODULE_NAME.jsx",
  "position": null
}
EOL

echo "Generating $MODULE_NAME.jsx"
cat >$MODULE_NAME.jsx <<EOL
import React, { Component } from 'react';
import Module from '../Module/Module';
import $POPOUT_NAME from './$POPOUT_NAME'
import './$MODULE_NAME.css';

export default class $MODULE_NAME extends Component {
  render() {
    return(
      <Module
        name='$MODULE_NAME'
        popoutHeight={500} // Change this to adjust the height of your popout
        popoutWidth={500}  // Change this to adjust the width of your popout
        popoutView={<$POPOUT_NAME />}
      >
        <div>
          <h1>Hello World - $MODULE_NAME module</h1>
        </div>
      </Module>
    )
  }
}
EOL

echo "Generating $POPOUT_NAME.jsx"
cat >$POPOUT_NAME.jsx <<EOL
import React, { Component } from 'react';
import './$MODULE_NAME.css';

export default class $POPOUT_NAME extends Component {
  render() {
    return (
      <div>$MODULE_NAME Popout</div>
    )
  }
}
EOL

echo "Generating $MODULE_NAME.css"
cat >$POPOUT_NAME.css <<EOL
# Add custom module styles here
EOL






#!/bin/bash
set -e

function message {
    echo ""
    printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' -
    echo "#"  "$@"
    printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' -
    echo ""
}

function selenium_install {
    SELENIUM_DIR="./node_modules/selenium-standalone/.selenium/"

    if [ ! -d "$SELENIUM_DIR" ]; then

      if [ "$CI" != true ]; then
      message "Installing selenium..."
      fi

      npm run selenium-install
      mkdir -p reports/
    fi
}

function selenium_start {
    # Use defult config for selenium-standalone lib
    nohup npm run selenium-start > ./reports/selenium.log 2>&1&
}

function http_server_start {
    SSL_CONFIG="./node_modules/webpack-dev-server/ssl/server.pem"
    HTTP_SERVER="http-server ./dist_e2e --ssl --cert=${SSL_CONFIG} --key=${SSL_CONFIG}"

    nohup $HTTP_SERVER > ./reports/http-server.log 2>&1&
    sleep 10
}

function ci_cleanup {
    rm -rf ./dist_e2e
    babel-node ./test/setup/files/removeCertificate.js
    rm simplefilename.testfile
}

function ci_setup {
    selenium_install

    npm run build
    mv ./dist ./dist_e2e

    babel-node ./test/setup/createTestInstances.js
    touch simplefilename.testfile
    npm run lint-tests

    selenium_start
    http_server_start
}

function ci_tests {
    MESSAGE=$(git log --pretty=format:%s -n 1 "$CIRCLE_SHA1")
    npm run lint

    if [[ "$MESSAGE" == *\[e2e-skip\]* ]]; then
        message "[WARN] Skipping E2E tests !!!"
    else
        ci_setup

        if [ $CIRCLE_BRANCH = 'master' ] || [ $CIRCLE_BRANCH = 'devel' ]; then
            message "Starting master/devel test flow..."
            npm run e2e-master-devel
        else
            message "Starting branch test flow..."
            npm run e2e-branch
        fi

        ci_cleanup
    fi
}

function local_cleanup {
    message "Closing selenium server..."
    pkill -f selenium-standalone

    message "Cleaning account from test instances..."
    babel-node ./test/setup/deleteTestInstances.js

    message "Done"
}

function local_setup {
    selenium_install

    message "Creating temporary instances for tests..."
    babel-node ./test/setup/createTestInstances.js
    touch simplefilename.testfile

    message "Starting Selenium in background..."
    trap local_cleanup EXIT
    selenium_start
    sleep 5
}

function local_tests {
    local_setup
    message "Checking tests with lint..."
    npm run lint-tests -- --fix

    if [ -n "$1" ]; then
        message "Tag: ${1} local tests starts..."
        npm run e2e-tag $1
    else
        if [ $CI = 'local' ]; then
          message "[INFO] Running internal full tests, be sure to export all variables"
          npm run e2e-branch
        else
          message "Full local tests starts..."
          npm run e2e-local
        fi
    fi
}

if [ "$CI" = true ] && [ $CI != 'local' ]; then
    ci_tests
else
    local_tests $@
fi

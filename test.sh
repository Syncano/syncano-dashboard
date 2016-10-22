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

      gulp selenium-install
      mkdir -p reports/
    fi
}

function selenium_start {
    SELENIUM_JAR="java -jar ./node_modules/selenium-standalone/.selenium/selenium-server/2.53.0-server.jar"
    SELENIUM_ENTROPY="-Djava.security.egd=file:/dev/./urandom"
    SELENIUM="${SELENIUM_JAR} ${SELENIUM_ENTROPY}"

    SELENIUM_ROLE_HUB="-role hub"
    SELENIUM_SERVER="${SELENIUM} ${SELENIUM_ROLE_HUB}"

    SELENIUM_CHROMEDRIVER="-Dwebdriver.chrome.driver=./node_modules/selenium-standalone/.selenium/chromedriver/2.22-x64-chromedriver"
    SELENIUM_ROLE_WEBDRIVER="-role webdriver -hub http://localhost:4444/grid/register"
    SELENIUM_CHROMEDRIVER="${SELENIUM} ${SELENIUM_CHROMEDRIVER} ${SELENIUM_ROLE_WEBDRIVER}"

    nohup $SELENIUM_SERVER > ./reports/selenium-server.log 2>&1&
    nohup $SELENIUM_CHROMEDRIVER > ./reports/selenium-chrome.log 2>&1&
}

function http_server_start {
    KEY="--key ./node_modules/webpack-dev-server/ssl/server.key"
    CERT="--cert ./node_modules/webpack-dev-server/ssl/server.crt"
    HTTP_SERVER="http-server ./dist_e2e --ssl ${CERT} ${KEY}"

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
    message "Closing selenium server. Please wait..."
    babel-node ./test/setup/deleteTestInstances.js
    kill $(ps aux | grep '[.]selenium' | awk '{print $2}') \
      && message "Done"
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

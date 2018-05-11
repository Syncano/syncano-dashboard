import React from 'react';
import { RaisedButton } from 'material-ui';
import { MobileOnboarding } from '../../common/';
import { URLS } from '../../constants/Constants';

const AppMobileOnboarding = () => (
  <MobileOnboarding>
    <MobileOnboarding.Slide
      headline="Welcome to Syncano"
      text={
        <div>
          <p className="vm-4-b">
            Unfortunately, the Syncano Dashboard is not optimized for smartphones just yet. You’ll have to
            open it on a tablet or computer.
          </p>
          <p>For now, we’d like to show you some of the things you’ll be able to do here!</p>
        </div>
      }
      imageSrc={require('../../assets/img/illustrations/build-powerful-apps-in-half-the-time.svg')}
    />
    <MobileOnboarding.Slide
      headline="What is Syncano?"
      text={
        <p>
          Syncano is a platform designed to help you increase your productivity, focus on new features, and
          scale without managing servers.
        </p>
      }
    >
      <img
        src={require('../../assets/img/illustrations/what-is-syncano.png')}
        alt="What is Syncano?"
        style={{ display: 'block', width: '100vw', margin: '0 -30px' }}
      />
    </MobileOnboarding.Slide>
    <MobileOnboarding.Slide
      headline="Sockets"
      text={
        <p>
          Simplify your stack. Piece together one or multiple features as building blocks for your app. Use
          Syncano Sockets as a data hub and easily connect disparate backend systems.
        </p>
      }
      imageSrc={require('../../assets/img/illustrations/assemble-your-backend-with-building-blocks.svg')}
    />
    <MobileOnboarding.Slide headline="Join the Community">
      <img
        src={require('../../assets/img/illustrations/syncano-slack.svg')}
        alt="Join the Community"
        style={{ display: 'block', margin: '0 auto' }}
      />
      <a
        href={URLS['slack-invite']}
        target="_blank"
      >
        <RaisedButton
          label="Send an Invite"
          backgroundColor="#FFCC01"
          labelColor="#1D2228"
          labelStyle={{ fontWeight: 700 }}
          style={{ marginTop: 30 }}
        />
      </a>
      <div style={{ marginTop: 50, fontSize: 20, fontWeight: 500, color: '#244273' }}>
        Connect with us
      </div>
      <div style={{ marginTop: 30, display: 'flex', justifyContent: 'center' }}>
        <a
          href={URLS.twitter}
          target="_blank"
          style={{ display: 'block', fontSize: 36, color: '#afb8c2', margin: '0 10px' }}
        >
          <span className="synicon-twitter" />
        </a>
        <a
          href={URLS.facebook}
          target="_blank"
          style={{ display: 'block', fontSize: 36, color: '#afb8c2', margin: '0 10px' }}
        >
          <span className="synicon-facebook-box" />
        </a>
      </div>
    </MobileOnboarding.Slide>
  </MobileOnboarding>
);

export default AppMobileOnboarding;

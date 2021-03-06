import React, { Fragment, useContext } from "react";
import styled from "styled-components";

import { BrowserView, MobileView } from "react-device-detect";

import { FloatingSpaceContext } from "../contexts/FloatingSpaceContext";

import Room from "./Room";
import JitsiInstanceMobile from "./integrations/JistiInstanceMobile";

const Headline = styled.h6`
  color: whitesmoke;
  font-weight: 600;
  font-size: 1.3rem;
  padding: 1rem;

  a {
    font-weight: 100;
    color: black;
    background-color: #00ffbf;
    text-decoration: underline;
  }

  @media (max-width: 600px) {
    background-color: black;
  }
`;

const SpaceSelector = styled.nav`
  padding-bottom: 1rem;
  width: 100%;

  @media (max-width: 600px) {
    background-color: black;
    padding: 0px;
    min-height: 10vh;
  }
`;

const SpaceInfo = styled.div`
  text-align: center;
  padding-top: 1rem;
  margin: 0 auto;
  font-size: 1rem;
  z-index: 100;
  div {
    color: violet;
  }
`;

const Description = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;
  background-color: black;
  z-index: 1;
  margin: 0px;
  font-size: 0.8rem;
  padding-bottom: 0.4rem;
  p {
    padding: 0.5rem;
    margin: 0px;
  }

  a {
    padding: 0px;
  }
`;

const CurrentSpace = styled.span`
  color: whitesmoke;
`;

const MobileContainer = styled.div`
  background: black;
  justify-content: center;
`;

const MobileSelectorContainer = styled.div`
  background: black;
  box-shadow: inset 0px 0px 30px 30px rgba(0, 0, 0, 0);
  justify-content: center;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 0.2rem;
`;

const Space = () => {
  const { currentFloatingSpaces, addFloatingSpace } = useContext(
    FloatingSpaceContext
  );

  let displayedJoinedSpaces;
  if (currentFloatingSpaces.length > 0) {
    if (currentFloatingSpaces.length > 2) {
      let nameCount = currentFloatingSpaces.length;
      displayedJoinedSpaces =
        currentFloatingSpaces.slice(0, nameCount - 2).join(", ") +
        ", " +
        currentFloatingSpaces.slice(nameCount - 2, nameCount).join(" & ");
    } else {
      displayedJoinedSpaces = currentFloatingSpaces.join(" & ");
    }
  }

  const openInNewTab = url => {
    let win = window.open(url, "_blank");
    win.focus();
  };

  return (
    <SpaceSelector>
      <BrowserView>
          <span>
            <SpaceInfo>
              {displayedJoinedSpaces ? (
                <Fragment>
                  You're in the{" "}
                  <CurrentSpace>{displayedJoinedSpaces}</CurrentSpace>!
                </Fragment>
              ) : (
                <Fragment>
                  <div>Click on a portal</div>
                </Fragment>
              )}
            </SpaceInfo>
          </span>
          <div>
            <div className="m-grid-container">
              <div
                id="c6"
                onClick={() => window.open("https://t.me/joinchat/EMsE7FeR9UjWW8V1ELRi7g")}
                className="circle row-2 c-rectright click-zone"
              >Get in line for a VR entry code
                <p>{"{Telegram}"}</p>
              </div>
              <div
                id="c8"
                className="circle row-5 c-center-right"
                onClick={() => addFloatingSpace("stream")}
              >Watch on Your Own
                <p>{"{DJ Stream}"}</p>
              </div>
              <div
                id="c9"
                onClick={() => window.open("https://hubs.mozilla.com/link/")}
                className="circle row-6 c-rectleft click-zone"
              >Enter VR
                <p>{"{Code required! Works in browser.}"}</p>
              </div>
              <div
                id="c11" 
                onClick={() => addFloatingSpace("capsule1")}
                className="circle row-3 c-center-left"
              >Watch with Others
                <p>{"{Jitsi}"}</p>
              </div>
            </div>
          </div>
      </BrowserView>
      <MobileView>
        <MobileContainer>
          <Headline>
            This site is not mobile-optimized. Please visit on a laptop or desktop browser.
          </Headline>
          <MobileSelectorContainer>
            <Room roomName="LateVoicesNeedPerfectly" />
          </MobileSelectorContainer>
          <JitsiInstanceMobile />
        </MobileContainer>
      </MobileView>
    </SpaceSelector>
  );
};

export default Space;

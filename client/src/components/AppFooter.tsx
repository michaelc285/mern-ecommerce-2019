import React from "react";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { LINKEDIN_LINK, GITHUB_LINK, EMAIL_ADDRESS } from "../path";

const AppFooter = () => {
  return (
    <footer className=" pt-5 pb-2 bg-gray-800 text-white">
      <div className="container mx-auto ">
        <div className="flex flex-col items-center justify-around">
          {/* External link group*/}
          <div className="w-32 mb-3">
            {/* LinkedIN */}
            <div className="flex justify-around ">
              <div className="rounded-full h-8 w-8 flex items-center justify-center bg-white">
                <a
                  href={LINKEDIN_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon />
                </a>
              </div>
              {/* Github */}
              <div className="rounded-full h-8 w-8 flex items-center justify-center bg-white">
                <a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer">
                  <GitHubIcon />
                </a>
              </div>
              {/* Email */}
              <div className="rounded-full h-8 w-8 flex items-center justify-center bg-white">
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MailOutlineIcon />
                </a>
              </div>
            </div>
          </div>
          <span className="text-gray-500 text-center ">
            ©2020 Michael Development. All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;

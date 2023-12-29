import React from 'react'
import ProgramInfo from './ProgramInfo'
import Footer from './Footer'
import { Element } from "react-scroll";


function Programs() {
  return (
    <div>
      <ProgramInfo />
      <Element name="contact-section">
        <div>
          {/* Your content */}
          <Footer />
        </div>
      </Element>
    </div>
  );
}

export default Programs
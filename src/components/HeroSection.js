import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from "styled-components";
import { Button } from "../styles/button";
import home from '../image/home.jpg';

const HeroSection = ({ name }) => {
  return (
    <Wrapper>
      <div className="container">
        <div className='grid-two-column'>
          <div className='intro-data'>Welcome to
            <h1>{ name }</h1>
            <p>
              This simple shopping cart prototype shows how React with Typescript, React hooks, 
              react Context and Styled Components can be used to build a friendly
              user experience with instant visual updates and scaleable code in ecommerce applications.
            </p>
            <NavLink>
              <Button>
                shop now
              </Button>
            </NavLink>
          </div>
          <div className='hero-section-image'>
            <figure>
              <img src={home} alt="Shopping cart prototype homepage" className="img-style" />
            </figure>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .grid-two-column {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
  }

  .intro-data {
    width: 80%;
    margin-right: auto;
  }
  .img-style {
    width: 100%;
    max-width: 400px;
  }
  .hero-section-image {
    width: 90%;
    margin-left: auto;
  }
`;

export default HeroSection;

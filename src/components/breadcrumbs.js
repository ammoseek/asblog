import React from 'react'
import Styled from 'styled-components'
import { Link } from 'gatsby'

const BreadcrumbDiv = Styled.div`
   display: inline-block;
   box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.35);
   overflow: hidden;
   border-radius: 5px;
   margin-top: -2rem;

   a {
      text-decoration: none;
	   outline: none;
	   display: block;
	   float: left;
	   font-size: 12px;
	   line-height: 36px;
	   color: white;
	   padding: 0 10px 0 60px;
	   background: #666;
	   background: linear-gradient(#666, #333);
	   position: relative;
   }
   a:first-child {
      padding-left: 15px;
      border-radius: 5px 0 0 5px;
   }
   a:first-child:before {
      left: 14px;
   }
   a:last-child {
      border-radius: 0 5px 5px 0;
      padding-right: 20px;
      padding-left: 2rem;
      font-style: italic;
      color: lightgray;
   }
   a.active, a:hover {
      background: #333;
      background: linear-gradient(#333, #000);
   }
   a.active:after, a:hover:after {
      background: #333;
      background: linear-gradient(135deg, #333, #000);
   }
   a:after {
      content: '';
      position: absolute;
      top: 0;
      right: -18px;
      width: 36px;
      height: 36px;
      transform: scale(0.707) rotate(45deg);
      z-index: 1;
      background: #666;
      background: linear-gradient(135deg, #666, #333);
      box-shadow: 2px -2px 0 2px rgba(0, 0, 0, 0.4), 3px -3px 0 2px rgba(255, 255, 255, 0.1);
      border-radius: 0 5px 0 50px;
   }
   a:last-child:after {
      content: none;
   }
`

const Breadcrumbs = ({ title, slug }) => {
   return (
      <BreadcrumbDiv>
	      <Link to="/">Home</Link>
	      <Link className="active" to={`/posts${slug}`}>{title}</Link>
      </BreadcrumbDiv>
   )
}

export default Breadcrumbs

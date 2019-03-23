import React from 'react';
import { NavLink } from 'react-router-dom';
const Link = NavLink;
export default class Hero extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        let link = (!this.props.user) ? "/signup" : "/createprono";
        return (
            <div className="hero">
                <h1 className="title wow fadeInDown" data-wow-delay=".2s">Sports Prono</h1>
                <h2 className="subtitle wow fadeInDown" data-wow-delay="0.6s">Bet on sports with friends</h2>
                <Link className="cta-button wow fadeInDown" data-wow-delay="1s" style={{ textDecoration: 'none' }} to={link}>Try now</Link>
            </div>
        );
    }
}
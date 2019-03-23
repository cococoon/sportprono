import React from 'react';
export default class Section extends React.Component {
    render() {
        return (
            <section className="section">
                <div className="section-content">
                    {this.props.children}
                </div>
            </section>
        )
    }
}
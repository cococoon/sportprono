import React from 'react';

export default class Main extends React.Component {

    render() {
        return (
            <main className="fadeIn main-wrapper">
                {this.props.children}
            </main>
        )
    }
}
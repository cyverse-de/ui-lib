/**
 *
 * @author sriram
 *
 */

import React, { Component } from "react";
import Announcer from "./Announcer";
import { TIMEOUT, CENTER, TOP, INFO } from "./AnnouncerConstants";

let msgQueue = [];

class CyVerseAnnouncer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: null,
            msg: "",
            open: false,
        };
    }

    componentDidMount() {
        let timer = setInterval(this.tickCallback, TIMEOUT);
        //display first message right away
        this.dequeue();
        this.setState({ timer });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    dequeue = () => {
        if (msgQueue.length > 0) {
            this.setState({ msg: msgQueue.shift(), open: true });
        }
    };

    handleClose = () => {
        this.setState({ open: false }, () => {
            this.tickCallback();
        });
    };

    tickCallback = () => {
        this.dequeue();
    };

    render() {
        const {
            msg: {
                text,
                variant,
                duration,
                horizontal,
                vertical,
                CustomAction,
            },
            open,
        } = this.state;
        return (
            <Announcer
                message={text}
                variant={variant ? variant : INFO}
                open={open}
                duration={duration ? duration : TIMEOUT}
                onClose={this.handleClose}
                horizontal={horizontal ? horizontal : CENTER}
                vertical={vertical ? vertical : TOP}
                CustomAction={CustomAction}
            />
        );
    }
}

export default CyVerseAnnouncer;

/**
 * @typedef {(TOP|BOTTOM)} VerticalAlignmentEnum
 */

/**
 * @typedef {(RIGHT|LEFT|CENTER)} HorizontalAlignmentEnum
 */

/**
 * @typedef {(INFO|ERROR|WARNING|SUCCESS)} VariantEnum
 */

/**
 * @typedef {Object} QueueMessage
 * @property {string} text - The message text.
 * @property {VariantEnum} variant - The message variant.
 * @property {number} duration - The message duration.
 * @property {HorizontalAlignmentEnum} horizontal - The message horizontal alignment.
 * @property {VerticalAlignmentEnum} vertical - The message vertical alignment.
 */

/**
 *  Queue messages needed to be announced using CyVerseAnnouncer
 *  @param {QueueMessage} msg - A message with configuration.
 */
const announce = (msg) => {
    msgQueue.push(msg);
};

export { announce };

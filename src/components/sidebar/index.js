import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Trigger from './trigger';
import Sidebar from './sidebar';
import styles from './styles.scss';

class SidebarContainer extends Component {
  static propTypes = {
    animation: PropTypes.oneOf([ 'rotateIn' ]),
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    contentClassName: PropTypes.string
  };

  static defaultProps = {
    animation: 'rotateIn'
  };

  constructor() {
    super();
    this.state = {
      isOpen: false
    };
  }

  close = (event) => {
    event.stopPropagation();
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    }
  };

  open = (event) => {
    event.stopPropagation();
    this.setState({ isOpen: true });
  };

  stopPropagation(event) {
    event.stopPropagation();
  }

  render() {
    const { animation, children, className, contentClassName } = this.props;
    const { isOpen } = this.state;

    return (
      <div
        className={classNames(
          styles.sidebarContainer,
          styles[animation],
          {
            [styles.open]: isOpen
          },
          className
        )}
        onClick={this.close}>
        <div className={styles.pushWrapper}>
          <Sidebar className={styles.sidebar} onClick={this.stopPropagation} />

          <div className={classNames(styles.content, contentClassName)}>
            <div className={styles.trigger} onClick={this.open}>
              <Trigger />
            </div>

            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default SidebarContainer;

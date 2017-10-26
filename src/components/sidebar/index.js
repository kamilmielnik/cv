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

  componentWillMount() {
    document.body.addEventListener('keydown', this.onBodyKeyDown);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.onBodyKeyDown);
  }

  onBodyKeyDown = (event) => {
    if (event.key === 'Escape') {
      this.toggle();
    }
  };

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

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
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
            {children}

            <div className={styles.trigger} onClick={this.open}>
              <Trigger />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SidebarContainer;

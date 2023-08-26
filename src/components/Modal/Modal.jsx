import { Overlay } from 'components';
import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handlePressEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlePressEsc);
  }

  handleClick = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal({ url: '', alt: '' });
    }
  };

  handlePressEsc = event => {
    console.log(event);
    if (event.code === 'Escape') {
      this.props.closeModal({ url: '', alt: '' });
    }
  };
  render() {
    const { url, alt } = this.props;
    return (
      <Overlay onClick={this.handleClick}>
        <img src={url} alt={alt} />
      </Overlay>
    );
  }
}

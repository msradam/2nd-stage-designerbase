
import React from 'react';
import { ReactTypeformEmbed } from 'react-typeform-embed';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.openForm = this.openForm.bind(this);
  }

  openForm() {
    this.typeformEmbed.typeform.open();
  }

  render() {
    return (
      <div>
        <ReactTypeformEmbed
          popup
          autoOpen={false}
          url="https://secondstage.typeform.com/to/g9rske"
          hideHeaders
          hideFooter
          buttonText="Go!"
          style={{ top: 100 }}
          ref={tf => {
            this.typeformEmbed = tf;
          }}
        />
        <button className='btn' onClick={this.openForm} style={{ cursor: 'pointer' }}>
          Sign up as a designer!
        </button>
      </div>
    );
  }
}

export default Popup;
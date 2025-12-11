import React from 'react';

export default function Alert(props) {
  return (
    <div
      className="alerter"
      style={{ position: 'fixed', width: '100%', textAlign: props.align }}
    >
      {props.mess && (
        <div
          className={`alert alert-${props.mess.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{props.mess.type}:</strong> {props.mess.msg}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          />
        </div>
      )}
    </div>
  );
}
Alert.defaultProps = {
  align: 'left',
};

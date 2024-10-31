import React from 'react';
import { QRCodeCanvas  } from 'qrcode.react';

const QRCodeGenerator = ({ value }) => {
  return (
    <div>
      <h2>Código QR</h2>
      <QRCodeCanvas  value={value} size={256} />
    </div>
  );
};

export default QRCodeGenerator;

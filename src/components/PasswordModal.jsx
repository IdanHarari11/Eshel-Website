import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

const PasswordModal = ({ onPasswordSubmit }) => {
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(true);

  const handleSubmit = () => {
    onPasswordSubmit(password);
  };

  return (
    <Dialog header="Enter Password" visible={visible} modal closable={false}>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="password">Password</label>
          <Password
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            feedback={false}
          />
        </div>
        <Button label="Submit" onClick={handleSubmit} />
      </div>
    </Dialog>
  );
};

export default PasswordModal;
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  return (
    <Dialog header="הזן סיסמא" visible={visible} modal closable={false} dir="rtl">
      <div className="p-fluid">
        <div className="p-field m-2">
          <label htmlFor="password"><b>סיסמא:</b></label>
          <Password
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)} 
            feedback={false}
            className='border-2 border-solid'
          />
        </div>
        <Button label="אישור" className='border-2 border-solid rounded-md w-25' onClick={handleSubmit} />
      </div>
    </Dialog>
  );
};

export default PasswordModal;
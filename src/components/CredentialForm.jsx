import React, { useState } from 'react';

const CredentialForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const reservedUsernames = ['admin', 'root'];

  const validateUsername = (name) => {
    if (name.length < 3) {
      return 'El nombre de usuario debe tener al menos 3 caracteres.';
    }
    if (reservedUsernames.includes(name)) {
      return 'Este nombre de usuario está reservado.';
    }
    return '';
  };

  const calculatePasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength += 20;
    if (/[a-z]/.test(pass)) strength += 20;
    if (/[A-Z]/.test(pass)) strength += 20;
    if (/[0-9]/.test(pass)) strength += 20;
    if (/[^a-zA-Z0-9]/.test(pass)) strength += 20;
    return strength;
  };

  const handleUsernameChange = (e) => {
    const name = e.target.value;
    setUsername(name);
    setUsernameError(validateUsername(name));
  };

  const handlePasswordChange = (e) => {
    const pass = e.target.value;
    setPassword(pass);
    setPasswordStrength(calculatePasswordStrength(pass));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usernameError || passwordStrength < 80) {
      alert('Please correct any errors before sending.');
    } else {
      alert('Credentials successfully changed.');
    }
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength < 40) return 'red';
    if (strength < 60) return 'orange';
    if (strength < 70) return 'yellow';
    return 'green';
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          className="form-control"
        />
        {usernameError && <p className="error-text">{usernameError}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="form-control"
          />
          <button type="button" onClick={togglePasswordVisibility} className="toggle-button">
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="progress-bar-wrapper">
          <div className="progress-bar" style={{ backgroundColor: getPasswordStrengthColor(passwordStrength), width: `${passwordStrength}%` }}></div>
        </div>
        <div className="password-requirements">
          <div className="font-semibold text-xm mb-4">Pick a password</div>
          <ul className="pl-2 ml-2 my-0 leading-normal">
            <li>At least one lowercase</li>
            <li>At least one uppercase</li>
            <li>At least one numeric</li>
            <li>At least one special character</li>
            <li>Minimum 8 characters</li>
          </ul>
        </div>
      </div>
      <button type="submit" className="submit-button">Change Password</button>
    </form>
  );
};

export default CredentialForm;
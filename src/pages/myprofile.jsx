import { Camera, Check, Edit2, Mail, Phone, User } from 'lucide-react';
import { useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/header';
import './myprofile.css';

function Myprofile() {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    profilePic: 'https://via.placeholder.com/150',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({ ...userData });
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setUserData(tempData);
    setIsEditing(false);
    console.log('Profile Updated Successfully');
  };

  return (
    <div className="profile-page">
      <Header />

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <h2>Account Settings</h2>
            <p>Manage your profile information and security</p>
          </div>

          <div className="profile-body">
            <div className="avatar-section">
              <div className="avatar-wrapper">
                <img src={userData.profilePic} alt="Profile" className="profile-img" />
                <button
                  className="change-pic-btn"
                  onClick={() => fileInputRef.current.click()}
                  title="Change Profile Picture"
                >
                  <Camera size={18} />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  hidden
                  accept="image/*"
                />
              </div>
              <div className="avatar-info">
                <h3>{userData.name}</h3>
                <p>{userData.email}</p>
              </div>
            </div>

            <hr className="divider" />

            <div className="profile-form">
              <div className="input-group">
                <label><User size={16} /> Full Name</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    value={isEditing ? tempData.name : userData.name}
                    readOnly={!isEditing}
                    onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
                    className={isEditing ? 'editable' : ''}
                  />
                </div>
              </div>

              <div className="input-group">
                <label><Mail size={16} /> Email Address</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    value={userData.email}
                    readOnly
                    className="disabled-input"
                    title="Email cannot be changed"
                  />
                </div>
                <small className="helper-text">Email address is linked to your account and cannot be modified.</small>
              </div>

              <div className="input-group">
                <label><Phone size={16} /> Phone Number</label>
                <div className="input-wrapper">
                  <input
                    type="tel"
                    value={isEditing ? tempData.phone : userData.phone}
                    readOnly={!isEditing}
                    onChange={(e) => setTempData({ ...tempData, phone: e.target.value })}
                    className={isEditing ? 'editable' : ''}
                  />
                </div>
              </div>
            </div>

            <div className="profile-actions">
              {isEditing ? (
                <>
                  <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                  <button className="save-btn" onClick={handleSave}><Check size={18} /> Save Changes</button>
                </>
              ) : (
                <button
                  className="edit-trigger-btn"
                  onClick={() => {
                    setTempData({ ...userData });
                    setIsEditing(true);
                  }}
                >
                  <Edit2 size={16} /> Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Myprofile;

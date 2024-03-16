import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faEnvelope, faPhone, faMapMarker, faFileImage, faHeart} from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faEnvelope, faPhone, faMapMarker, faFileImage, faHeart);


function profile(){
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(''); // Setting initial data
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        console.log('Saving profile data:');
        console.log('Profile Image:', profileImage);
        console.log('Profile Image:', selectedImage || 'No image selected');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Phone:', phone || 'Not provided');
        console.log('Address:', address || 'Not provided');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
        setProfileImage(file);
    };

    // Default profile image URL
    const defaultProfileImage = 'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png';

    return (
        <div>
        <div className="profile-container">
            <div className="profile-details">
                {isEditing ? (
                    <div>
                        <label>
                            <div className="profile-image">
                                <p>Profile Picture:</p>
                                <img src={selectedImage || defaultProfileImage} alt="Profile" style={{ maxWidth: '200px' }} />
                            </div>
                            <input type="file" accept="image/jpeg, image/png" onChange={handleImageChange} />
                        </label>
                        <label>
                            <p>Name:</p> <input type="text" placeholder='Set a Profile Name' value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label>
                            <p>Email:</p> <input type="text" placeholder='Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label>
                            <p>Phone Number:</p> <input type="text" placeholder='Optional' value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </label>
                        <label>
                            <p>Address:</p> <input type="text" placeholder='Optional' value={address} onChange={(e) => setAddress(e.target.value)} />
                        </label>
                        <button className="save-button" onClick={handleSaveClick}>Save</button>
                    </div>
                    
                ) : (
                    <div>
                        <div >
                            <div className="profile-image">
                                <img src={profileImage ? URL.createObjectURL(profileImage) : defaultProfileImage} alt="Profile" style={{ maxWidth: '200px' }} />
                            </div>
                            <div>
                                {name ? (
                                    <p className="profile-name"> {name}</p>
                                ) : (
                                    <p className="profile-name-undefined">Set your profile name</p>
                                )}
                                {email ? (
                                    <p className="profile-email"><span><FontAwesomeIcon icon="envelope" /></span>   {email}</p>
                                ) : (
                                    <p className="profile-email-undefined"><span><FontAwesomeIcon icon="envelope" /></span>  Set your email</p>
                                )}
                                {phone ? (
                                    <p className="profile-phone"><span><FontAwesomeIcon icon="phone" /></span> {phone}</p>
                                ) : (
                                    <p className="profile-phone-undefined"><span><FontAwesomeIcon icon="phone" /></span> Set your phone number</p>
                                )}
                                {address ? (
                                    <p className="profile-address"><span><FontAwesomeIcon icon="map-marker" /></span> {address}</p>
                                ) : (
                                    <p className="profile-address-undefined"><span><FontAwesomeIcon icon="map-marker" /></span> Set your address</p>
                                )}
                            </div>
                            <div>
                                <button className="edit-button" onClick={handleEditClick}>Edit</button>
                            </div>

                        </div>
                        
                    </div>
                )}

            </div>

            
        </div>
        <div className="additional-content">
            <div className="liked-events">
                <h3>A Minha Agenda</h3>

                <div>
                    <ul>
                    </ul>
                </div>
                
            </div>
            <div className="my-events">
                <h3>Eventos Prévios</h3>

                <div>
                    <ul>
                    </ul>
                </div>
                
            </div>
        </div>
    </div>
    
    )

}

export default profile
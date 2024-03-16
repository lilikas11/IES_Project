import React, { useState } from 'react';
import '../assets/css/Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faEnvelope, faBirthdayCake, faFileImage, faHeart} from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faEnvelope, faBirthdayCake, faFileImage, faHeart);


function profile(){
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(''); // Setting initial data
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [birthday, setBirthday] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const userID = localStorage.getItem('user_id');

    const [user, setUser] = useState({
        id: userID,
        username: '',
        name: '',
        email: '',
        password: '',
        bio: '',
        birthday: '',
        profile_pic: ''
        // ... other properties
    });
    
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        console.log('Saving profile data:', user);
    
        fetch(`/api/user/${user.id}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => response.json())
            .then(data => console.log('Update response:', data))
            .catch(error => console.error('Error updating user:', error));
    };
    

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
        setProfileImage(file);
    };
    

    const handleBirthdayChange = (event) => {
        const inputValue = event.target.value;
        // Remove any non-numeric characters
        const numericValue = inputValue.replace(/[^0-9]/g, '');
    
        // Format the input as day/month/year
        if (numericValue.length <= 2) {
          // Allow only day input (e.g., 12)
          setUser(prevUser => ({ ...prevUser, birthday: numericValue }));
        } else if (numericValue.length <= 4) {
          // Allow day and month input (e.g., 12/03)
          setUser(prevUser => ({ ...prevUser, birthday: `${numericValue.slice(0, 2)}/${numericValue.slice(2)}` }));
        } else {
          // Allow full date input (e.g., 12/03/1990)
          setUser(prevUser => ({
            ...prevUser,
            birthday: `${numericValue.slice(0, 2)}/${numericValue.slice(2, 4)}/${numericValue.slice(4, 8)}`,
          }));
        }
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
                                <p>Foto de perfil:</p>
                                <img src={selectedImage || defaultProfileImage} alt="Profile" style={{ maxWidth: '200px' }} />
                            </div>
                            <input type="file" accept="image/jpeg, image/png" onChange={handleImageChange} />
                        </label>
                        <label>
                            <p>Nome:</p> <input type="text" placeholder='Nome de perfil' value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label>
                            <p>Bio:</p> <input type="text" placeholder='Opcional' value={bio} onChange={(e) => setBio(e.target.value)} />
                        </label>
                        <label>
                            <p>Email:</p> <input type="text" placeholder='O Teu Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label>
                            <p>Aniversário:</p>{' '} <input type="text" placeholder='Opcional' value={birthday} onChange={handleBirthdayChange} />
                        </label>
                        <button className="save-button" onClick={handleSaveClick}>Salvar</button>
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
                                    <p className="profile-name-undefined"> Nome de perfil</p>
                                )}
                                {bio ? (
                                    <p className="profile-bio">{bio}</p>
                                ) : (
                                    <p className="profile-bio-undefined"> Adiciona uma bio. </p>
                                )}
                                {email ? (
                                    <p className="profile-email"><span><FontAwesomeIcon icon="envelope" /></span>   {email}</p>
                                ) : (
                                    <p className="profile-email-undefined"><span><FontAwesomeIcon icon="envelope" /></span>  O teu email</p>
                                )}
                                
                                {birthday ? (
                                    <p className="profile-birthday"><span><FontAwesomeIcon icon="birthday-cake" /></span>{' '} 
                                    {birthday}</p>
                                ) : (
                                    <p className="profile-birthday-undefined"><span><FontAwesomeIcon icon="birthday-cake" /></span> {' '}
                                    O teu aniversário{' '}</p>
                                )}
                            </div>
                            <div>
                                <button className="edit-button" onClick={handleEditClick}>Editar</button>
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
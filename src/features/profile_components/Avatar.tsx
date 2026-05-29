import { useState, useEffect } from 'react';
import './Avatar.css';
import { Camera } from 'lucide-react';

interface AvatarProps {
  name: string;
  avatarImage?: string | null;
}

function Avatar({ name, avatarImage }: AvatarProps) {
  const [image, setImage] = useState<string | null>(null);
  const firstLetter = name && name.length > 0 ? name.charAt(0).toUpperCase() : '?';
  const getStorageKey = () => `avatar_image_${name}`;
  
  console.log('Avatar рендер:', { name, firstLetter, image });

  useEffect(() => {
    const savedImage = localStorage.getItem(getStorageKey());
    
    if (savedImage && savedImage.startsWith('data:image')) {
      setImage(savedImage);
    } else if (avatarImage) {
      setImage(avatarImage);
    } else {
      setImage(null);
    }
  }, [name, avatarImage]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        localStorage.setItem(getStorageKey(), base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="avatar-container">
      {image ? (
        <img src={image} alt="Аватар" className="avatar-image" />
      ) : (
        <div className="avatar-letter">{firstLetter}</div>
      )}
      
      <label className="avatar-camera">
        <Camera size={16} strokeWidth={2} />
        <input 
          type="file" 
          accept="image/*" 
          onChange={handlePhotoUpload}
          style={{ display: 'none' }}
        />
      </label>
    </div>
  );
}

export default Avatar;
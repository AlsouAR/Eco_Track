import { useState } from 'react';
import './Avatar.css';
import { Camera } from 'lucide-react';


interface AvatarProps {
  name: string;
  avatarImage?: string | null;
}
function Avatar({ name, avatarImage }: AvatarProps) {
  const [image, setImage] = useState<string | null | undefined>(avatarImage);
  const firstLetter = name ? name.charAt(0).toUpperCase() : '?';

const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];  
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };
  return (
    <div 
      className="avatar-container"
    >
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
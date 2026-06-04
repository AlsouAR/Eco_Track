import { useState, useEffect } from "react";
import "./Avatar.css";
import { Camera } from "lucide-react";

interface AvatarProps {
  name: string;
  avatarImage?: string | null;
}

function Avatar({ name, avatarImage }: AvatarProps) {
  const [image, setImage] = useState<string | null>(null);
  const firstLetter = name.length > 0 ? name.charAt(0).toUpperCase() : "?";
  const getStorageKey = () => `avatar_image_${name}`;

  useEffect(() => {
    const savedImage = localStorage.getItem(getStorageKey());

    if (savedImage != null && savedImage.startsWith("data:image")) {
      setImage(savedImage);
    } else if (avatarImage != null) {
      setImage(avatarImage);
    } else {
      setImage(null);
    }
  }, [name, avatarImage]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        alert("Изображение слишком большое. Максимум 1 МБ");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64Size = new Blob([base64String]).size;
        if (base64Size > 1.5 * 1024 * 1024) {
          alert("Изображение слишком большое даже после кодирования");
          return;
        }

        try {
          const currentKey = getStorageKey();
      
          const oldAvatar = localStorage.getItem(currentKey);
          
          if (oldAvatar != null) {
            localStorage.removeItem(currentKey);
          }

          localStorage.setItem(currentKey, base64String);
          setImage(base64String);
          
        } catch (error) {
          console.error("Ошибка при сохранении аватара:", error);
          
          if (error === "QuotaExceededError") {
            alert("Недостаточно места в хранилище. Попробуйте изображение меньшего размера");
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="avatar-container">
      {image != null ? (
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
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
}

export default Avatar;
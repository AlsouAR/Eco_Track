import { useEffect, useState } from "react";

import { Camera } from "lucide-react";

import * as S from "./Avatar.styles";

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
    <S.AvatarContainer>
      {image != null ? (
        <S.AvatarImage src={image} alt="Аватар" />
      ) : (
        <S.AvatarLetter>{firstLetter}</S.AvatarLetter>
      )}

      <S.CameraLabel>
        <Camera size={16} strokeWidth={2} />
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          style={{ display: "none" }}
        />
      </S.CameraLabel>
    </S.AvatarContainer>
  );
}

export default Avatar;


import React from 'react';

interface UserAvatarProps {
  src?: string;
  name: string;
  size?: number;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  src, 
  name, 
  size = 80, 
  className = "" 
}) => {
  const getInitials = (fullName: string) => {
    const names = fullName.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  const style = {
    width: size,
    height: size,
    fontSize: size * 0.4
  };

  if (src) {
    return (
      <img
        src={src}
        alt={`Foto de perfil de ${name}`}
        className={`rounded-full object-cover ${className}`}
        style={style}
      />
    );
  }

  return (
    <div
      className={`rounded-full bg-[#f0cbad] flex items-center justify-center text-[#3a210c] font-semibold ${className}`}
      style={style}
    >
      {getInitials(name)}
    </div>
  );
};

export default UserAvatar;

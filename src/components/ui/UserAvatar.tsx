
import React from 'react';

interface UserAvatarProps {
  size?: number;
  className?: string;
  name?: string;
  showBorder?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  size = 80, 
  className = "",
  name = "Juan Pérez",
  showBorder = false
}) => {
  // Generate initials from name
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const initials = getInitials(name);

  return (
    <div className={`relative ${className}`}>
      {/* Try to load profile photo, fallback to initials */}
      <div 
        className={`rounded-full bg-[#f0cbad] flex items-center justify-center overflow-hidden ${
          showBorder ? 'ring-2 ring-[#ac815d] shadow-md' : ''
        }`}
        style={{ width: size, height: size }}
      >
        <img 
          src="/lovable-uploads/15a38749-b798-438b-b164-baa94b3746b5.png"
          alt="Foto de perfil"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Hide image and show initials on error
            e.currentTarget.style.display = 'none';
            const initialsDiv = e.currentTarget.nextElementSibling as HTMLElement;
            if (initialsDiv) initialsDiv.style.display = 'flex';
          }}
        />
        <span 
          className="text-[#3a210c] font-semibold absolute inset-0 items-center justify-center hidden"
          style={{ fontSize: size * 0.375 }}
        >
          {initials}
        </span>
      </div>
    </div>
  );
};

export default UserAvatar;

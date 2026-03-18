import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="page-hdr">
      <div className="badge">
        <i className="fa-solid fa-headset"></i> Tele-Caller Portal
      </div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
};

interface SectionCardProps {
  icon: string;
  iconColor: string;
  title: string;
  description: string;
  stepNumber: string;
  children: React.ReactNode;
  animationDelay?: string;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  icon,
  iconColor,
  title,
  description,
  stepNumber,
  children,
  animationDelay = '0s',
}) => {
  return (
    <div className="sc" style={{ animationDelay }}>
      <div className="sc-hdr">
        <div className={`sc-icon ${iconColor}`}>{icon}</div>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="step-badge">{stepNumber}</div>
      </div>
      <div className="sc-body">{children}</div>
    </div>
  );
};

interface DayCardProps {
  dayNumber: number;
  colorClass: string;
  children: React.ReactNode;
}

export const DayCard: React.FC<DayCardProps> = ({ dayNumber, colorClass, children }) => {
  return (
    <div className="dc">
      <div className="dc-hdr">
        <div className={`dbadge ${colorClass}`}>Day {dayNumber}</div>
        <span style={{ fontSize: '12px', color: 'var(--txm)' }}>
          Configuration for Day {dayNumber}
        </span>
      </div>
      {children}
    </div>
  );
};

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  span2?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({ label, children, span2 = false }) => {
  return (
    <div className={`fld ${span2 ? 'span2' : ''}`}>
      <label>{label}</label>
      {children}
    </div>
  );
};

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'small' | 'delete';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  variant = 'primary',
  children,
}) => {
  let className = 'btn';
  if (variant === 'primary') className += ' btn-gen';
  else if (variant === 'secondary') className += ' btn-add';
  else if (variant === 'small') className += ' btn-sm btn-add';
  else if (variant === 'delete') className += ' btn-del';

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export const Divider: React.FC = () => <div className="divider"></div>;

interface InfoTextProps {
  children: React.ReactNode;
}

export const InfoText: React.FC<InfoTextProps> = ({ children }) => {
  return <div className="info">{children}</div>;
};

interface EmptyStateProps {
  icon: string;
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, message }) => {
  return (
    <div className="empty-state">
      <i className={`fa-solid ${icon}`}></i>
      {message}
    </div>
  );
};

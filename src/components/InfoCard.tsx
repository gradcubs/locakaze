
import React from 'react';

interface InfoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white dark:bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 p-6 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
      <div className="flex items-start">
        <div className="flex-shrink-0 bg-accent rounded-xl p-3 mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;

import React, { useState, ReactNode } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="collapsible-section">
      <div className="collapsible-section__header" onClick={toggleOpen}>
        <span className="collapsible-section__title">{title}</span>
        {isOpen ? (
          <FiChevronDown className="collapsible-section__icon" />
        ) : (
          <FiChevronRight className="collapsible-section__icon" />
        )}
      </div>
      {isOpen && <div className="collapsible-section__content">{children}</div>}
    </div>
  );
};

export default CollapsibleSection;
